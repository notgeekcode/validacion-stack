from typing import Tuple, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
from .security import hash_password

# ---------- Users ----------
def create_user(db: Session, data: schemas.UserRegister) -> models.User:
    user = models.User(
        email=data.email,
        hashed_password=hash_password(data.password),
        role=data.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

# ---------- Comercios ----------
def create_comercio(db: Session, data: schemas.ComercioCreate) -> models.Comercio:
    obj = models.Comercio(nombre=data.nombre, descripcion=data.descripcion)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_comercios(db: Session, page: int, page_size: int) -> Tuple[list[models.Comercio], int]:
    q = db.query(models.Comercio).order_by(models.Comercio.id.desc())
    total = db.query(func.count(models.Comercio.id)).scalar() or 0
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return items, total

# ---------- Eventos ----------
def create_evento(db: Session, data: schemas.EventoCreate) -> models.Evento:
    obj = models.Evento(
        titulo=data.titulo,
        inicio=data.inicio,
        fin=data.fin,
        comercio_id=data.comercio_id,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_eventos(db: Session, page: int, page_size: int) -> Tuple[list[models.Evento], int]:
    q = db.query(models.Evento).order_by(models.Evento.id.desc())
    total = db.query(func.count(models.Evento.id)).scalar() or 0
    items = q.offset((page - 1) * page_size).limit(page_size).all()
    return items, total