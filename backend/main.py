from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import timedelta
from typing import Optional

from auth import create_access_token, get_password_hash, verify_password, decode_access_token

load_dotenv()

app = FastAPI()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

@app.get("/users/me")
def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/admin/dashboard")
def admin_dashboard(current_user: dict = Depends(get_current_admin_user)):
    return {"message": "Welcome to the Admin Dashboard"}

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