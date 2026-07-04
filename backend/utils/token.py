from datetime import datetime, timedelta, timezone
from models.users import User
from dotenv import load_dotenv
from jose import JWTError, jwt
import os
from fastapi import HTTPException
from database import get_db
from sqlalchemy.orm import Session

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, db: Session):
    try:
        to_decode = jwt.decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_id = to_decode.get("user_id") or to_decode.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    current_user = db.query(User).filter(User.id == user_id).first()
    if current_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return current_user

