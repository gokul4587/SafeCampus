from fastapi import FastAPI
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/counselors")
def get_counselors():
    response = supabase.table('counselors').select("*").execute()
    return response.data

@app.get("/resources")
def get_resources():
    response = supabase.table('resources').select("*").execute()
    return response.data

@app.post("/reports")
def create_report(content: str):
    response = supabase.table('reports').insert({"content": content}).execute()
    return response.data