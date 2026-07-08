from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from schemas.company import CompanyCreate, CompanyUpdate, CompanyResponse
from models.company import Company
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import get_db, SessionLocal
from utils.oauth2 import get_current_user, role_required
from utils.token import verify_token
from sqlalchemy.ext.asyncio import AsyncSession 
from sqlalchemy.future import select   
from sqlalchemy.orm import selectinload


router = APIRouter(prefix="/company",tags=["company"])

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=CompanyResponse)
async def create_company(company: CompanyCreate,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    try:
        db_company=Company(**company.dict())
        db.add(db_company)
        await db.commit()
        await db.refresh(db_company)
        return db_company

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Database error creating company: {str(e)}")


@router.get("/", status_code=200)
async def get_all_company(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        results = await db.execute(select(Company),options(selectinload(Company.jobs)))
        companies = results.scalars().all()
        return companies
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error retrieving companies: {str(e)}")
    

@router.get("/{company_id}",status_code=status.HTTP_200_OK,response_model=CompanyResponse)
async def get_company(company_id: int,db:AsyncSession=Depends(get_db),current_user=Depends(get_current_user)):
    try:
        results =await  db.execute(select(Company).filter(Company.id == company_id))
        company = results.scalars().first()
    
        if not company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
        return company
    except HTTPException:
        raise
    except Exception as e:  
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error retrieving company: {str(e)}")
    

@router.put("/{company_id}",status_code=status.HTTP_201_CREATED,response_model=CompanyResponse)
async def update_company(company_id: int, company: CompanyUpdate,db:Session=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    try:
        db_company =await db.query(Company).filter(Company.id == company_id).first()
        if not db_company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
        for key, value in company.dict().items():
            setattr(db_company, key, value)
        await db.commit()
        await db.refresh(db_company)
        return db_company
    except HTTPException:
        raise  
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error updating company: {str(e)}")

@router.delete("/{company_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_company(company_id: int,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
    db.delete(db_company)
    db.commit()
    return {"message": "Company deleted successfully"}

# @router.get("/")
# def read_company():
#     return {"company": "Company root"}

# @router.get("/{company_id}")
# def read_company(company_id: int):
#     return {"company_id": company_id}
