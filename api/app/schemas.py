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


# ---- Comercios
class ComercioCreate(BaseModel):
    nombre: str
    descripcion: str | None = None

class ComercioRead(BaseModel):
    id: int
    nombre: str
    descripcion: str | None = None
    creado_en: datetime

    class Config:
        from_attributes = True


# ---- Eventos
class EventoCreate(BaseModel):
    titulo: str
    comercio_id: int | None = None
    fecha_inicio: datetime | None = None
    fecha_fin: datetime | None = None

class EventoRead(BaseModel):
    id: int
    titulo: str
    comercio_id: int | None = None
    fecha_inicio: datetime | None = None
    fecha_fin: datetime | None = None
    creado_en: datetime

    class Config:
        from_attributes = True


# ---- Auth

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
