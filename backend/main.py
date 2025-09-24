from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime, timedelta
from typing import Optional
import smtplib
from email.message import EmailMessage
import random

from auth import create_access_token, get_password_hash, verify_password, decode_access_token
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    email: str
    password: str
    role: str

class RoleUpdate(BaseModel):
    role: str

class PasswordResetRequest(BaseModel):
    email: str

class PasswordResetVerify(BaseModel):
    email: str
    otp: str
    new_password: str

class BroadcastMessage(BaseModel):
    message: str

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def send_email(to_email: str, subject: str, body: str):
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = subject
    msg['From'] = os.environ.get("SMTP_USERNAME")
    msg['To'] = to_email

    try:
        with smtplib.SMTP(os.environ.get("SMTP_SERVER"), int(os.environ.get("SMTP_PORT"))) as server:
            server.starttls()
            server.login(os.environ.get("SMTP_USERNAME"), os.environ.get("SMTP_PASSWORD"))
            server.send_message(msg)
    except Exception as e:
        print(f"Failed to send email: {e}")

# Helper function to get user from database
def get_user(username: str):
    response = supabase.table('users').select("*").eq('username', username).execute()
    if response.data:
        return response.data[0]
    return None

# Dependency to get current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = get_user(payload.get("sub"))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# Dependency to get optional current user
def get_optional_current_user(token: Optional[str] = Depends(oauth2_scheme)):
    if not token:
        return None
    return get_current_user(token)

# Dependency to check for admin user
def get_current_admin_user(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")
    return current_user

@app.post("/register")
def register(form_data: OAuth2PasswordRequestForm = Depends()):
    hashed_password = get_password_hash(form_data.password)
    response = supabase.table('users').insert({"username": form_data.username, "password": hashed_password}).execute()
    if response.data:
        return {"message": "User created successfully"}
    raise HTTPException(status_code=400, detail="Username already exists")

@app.post("/users/")
def create_user(user: UserCreate):
    if user.role == "admin" and not user.email.endswith("@university.edu"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin users must have a @university.edu email address.",
        )
    
    hashed_password = get_password_hash(user.password)
    response = supabase.table('users').insert({"username": user.email, "password": hashed_password, "role": user.role}).execute()
    if response.data:
        return {"message": "User created successfully"}
    raise HTTPException(status_code=400, detail="Email already exists")

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user['password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user['username'], "role": user.get('role'), "id": user['id']},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/password-reset/request")
def request_password_reset(request: PasswordResetRequest):
    otp = "".join([str(random.randint(0, 9)) for _ in range(6)])
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    # Store OTP in the database
    supabase.table('password_reset_tokens').upsert({
        "email": request.email,
        "otp": otp,
        "expires_at": expires_at.isoformat()
    }).execute()

    # Send OTP via email
    send_email(
        to_email=request.email,
        subject="Your Password Reset OTP",
        body=f"Your OTP for password reset is: {otp}"
    )

    return {"message": "OTP sent to your email."}

@app.post("/password-reset/verify")
def verify_password_reset(request: PasswordResetVerify):
    # Verify OTP
    response = supabase.table('password_reset_tokens').select("*").eq('email', request.email).eq('otp', request.otp).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Invalid OTP.")

    token_data = response.data[0]
    expires_at = datetime.fromisoformat(token_data['expires_at'])

    if datetime.utcnow() > expires_at:
        raise HTTPException(status_code=400, detail="OTP has expired.")

    # OTP is valid, reset the password
    hashed_password = get_password_hash(request.new_password)

    # First, get the user from the public.users table to get the auth.users id
    user_response = supabase.table('users').select("id").eq('username', request.email).execute()
    if not user_response.data:
        raise HTTPException(status_code=404, detail="User not found.")
    
    user_id = user_response.data[0]['id']

    # Update password in Supabase Auth
    try:
        # To update a user's password without them being logged in, we need to use the admin client
        supabase_admin = create_client(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_SERVICE_KEY"))
        supabase_admin.auth.admin.update_user_by_id(user_id, {"password": request.new_password})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update password in Supabase Auth: {e}")


    # Update password in public.users table
    supabase.table('users').update({'password': hashed_password}).eq('username', request.email).execute()

    # Delete the OTP from the database
    supabase.table('password_reset_tokens').delete().eq('email', request.email).execute()

    return {"message": "Password reset successfully."}

@app.get("/users/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.get("/users/all/")
def get_all_users(current_user: dict = Depends(get_current_admin_user)):
    response = supabase.table('users').select("*").execute()
    return response.data

@app.get("/users/{user_id}")
def get_user_by_id(user_id: int, current_user: dict = Depends(get_current_admin_user)):
    response = supabase.table('users').select("*").eq('id', user_id).execute()
    if response.data:
        return response.data[0]
    raise HTTPException(status_code=404, detail="User not found")

@app.put("/users/{user_id}/role")
def update_user_role(user_id: int, role_update: RoleUpdate, current_user: dict = Depends(get_current_admin_user)):
    response = supabase.table('users').update({"role": role_update.role}).eq('id', user_id).execute()
    if response.data:
        return response.data[0]
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_id}")
def delete_user(user_id: int, current_user: dict = Depends(get_current_admin_user)):
    response = supabase.table('users').delete().eq('id', user_id).execute()
    if response.data:
        return {"message": "User deleted successfully"}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/admin/dashboard")
def admin_dashboard(current_user: dict = Depends(get_current_admin_user)):
    return {"message": "Welcome to the Admin Dashboard"}

@app.post("/broadcast")
def broadcast_message(request: BroadcastMessage, current_user: dict = Depends(get_current_admin_user)):
    # Get all users
    response = supabase.table('users').select("username").execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="No users found.")

    # Send email to all users
    for user in response.data:
        send_email(
            to_email=user['username'],
            subject="Broadcast Message",
            body=request.message
        )

    return {"message": "Broadcast message sent to all users."}

@app.get("/counselors")
def get_counselors():
    response = supabase.table('counselors').select("*").execute()
    return response.data

@app.get("/resources")
def get_resources():
    response = supabase.table('resources').select("*").execute()
    return response.data

@app.post("/reports")
def create_report(content: str, current_user: Optional[dict] = Depends(get_optional_current_user)):
    user_id = current_user['id'] if current_user else None
    response = supabase.table('reports').insert({"content": content, "user_id": user_id}).execute()
    return response.data

@app.post("/resources")
def create_resource(title: str, url: str, thumbnail_url: str, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'admin':
        raise HTTPException(status_code=403, detail="Not authorized to create resources")
    response = supabase.table('resources').insert({"title": title, "url": url, "thumbnail_url": thumbnail_url}).execute()
    return response.data

@app.post("/counselors")
def create_counselor(name: str, current_user: dict = Depends(get_current_user)):
    if current_user['role'] != 'admin':
        raise HTTPException(status_code=403, detail="Not authorized to create counselors")
    response = supabase.table('counselors').insert({"name": name}).execute()
    return response.data