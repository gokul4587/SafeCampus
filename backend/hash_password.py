from auth import get_password_hash

password = "your_password_here"
hashed_password = get_password_hash(password)
print(hashed_password)
