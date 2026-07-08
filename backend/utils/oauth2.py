from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from database import get_db
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select
from sqlalchemy import text
from sqlalchemy.orm import Session
from utils.token import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    current_user = verify_token(token, db)
    results = await db.execute(select(current_user)).filter(users.id == int (current_user["sub"]))
    current_user_result = results.scalars().first()
    if current_user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return current_user


async def role_required(roles: list):
    def role_decorator(current_user=Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(status_code=403, detail="You do not have permission to access this resource/Access denied")
        return current_user

    return role_decorator