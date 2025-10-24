# api/app/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

# ---- Usuarios

class UserCreate(BaseModel):
    email: EmailStr
    # límite 72 por compatibilidad de esquemas de hash
    password: str = Field(min_length=8, max_length=72)
    role: str = Field(default="user")

class UserRead(BaseModel):
    id: int
    email: EmailStr
    role: str
    creado_en: datetime

    class Config:
        from_attributes = True  # para SQLAlchemy -> Pydantic v2

# ---- Auth

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
