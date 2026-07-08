from django.db import router

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.users import User
from schemas.users import Login_User, UserCreate, UserResponse
from schemas.tokens import Token
from database import get_db
from utils.security import hash_password, verify_password
from utils.token import create_access_token
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select

@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if the user already exists
    try:
        results = await db.execute(select(User).filter(User.email == user.email))
        existing_user = results.scalars().first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        # Hash the password
        hashed_password = hash_password(user.password)

        # Determine a display name from available fields
        name = user.name or user.email

        # Create a new user instance
        db_user = User(
            name=name,
            email=user.email,
            hashed_password=hashed_password,
            role=user.role
        )

        # Add the new user to the database
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)

        return db_user
    except HTTPException:
        raise 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error during registration: {str(e)}")

@ router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    try:
        results = await db.execute(select(User).filter(User.email == form_data.username))
        existing_user = results.scalars().first()
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        if not verify_password(form_data.password, existing_user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect password")
        access_token = create_access_token(data={"sub": str(existing_user.id), "role": existing_user.role})
        return {"access_token": access_token, "token_type": "bearer"}

    except HTTPException:
        raise
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"Authentication server error: {str(e)}")
        