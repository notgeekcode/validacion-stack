# api/app/main.py
from typing import List
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse, JSONResponse
from sqlalchemy import text
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from .db import Base, engine, SessionLocal
from .models import User
from .schemas import (
    UserCreate, UserRead, Token,
    ComercioCreate, ComercioRead,
    EventoCreate, EventoRead,
)
from .security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_role,
)
from . import crud, schemas
import os
import logging


# ---------- Lifespan: chequeo liviano de DB al iniciar ----------
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        with engine.connect() as conn:
            conn.execute(text("select 1"))
        logging.info("[startup] DB check OK")
    except Exception as e:
        logging.warning("[startup] DB check FAILED: %s", e)
    yield


# ---------- Instancia principal ----------
app = FastAPI(title="SITD API", version="0.1.0", lifespan=lifespan)


# ---------- CORS ----------
FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Agregá tu URL pública si ya la tenés (ejemplo):
PUBLIC_API = os.getenv("PUBLIC_API_ORIGIN")  # p.ej. https://sitd-api-xxxxx.a.run.app
if PUBLIC_API:
    FRONTEND_ORIGINS.append(PUBLIC_API)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Ruta raíz (para evitar 404 en "/") ----------
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")


# ---------- Dependencia de DB por request ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- Creación de tablas en DEV ----------
if os.getenv("CREATE_TABLES_ON_STARTUP") == "1":
    @app.on_event("startup")
    def _create_all_for_dev_only():
        Base.metadata.create_all(bind=engine)
        logging.info("[startup] Base.metadata.create_all() ejecutado (DEV).")


# ---------------------------
#            AUTH
# ---------------------------

@app.post("/auth/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    if len(payload.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="password cannot be longer than 72 bytes (máx 72 bytes).",
        )

    user = User(
        email=payload.email.lower(),
        hashed_password=hash_password(payload.password),
        role=payload.role,
    )
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email ya registrado")
    db.refresh(user)
    return user


@app.post("/auth/token", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    email = (form.username or "").lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = create_access_token(subject=user.email, role=user.role)
    return Token(access_token=access_token)


# ---------------------------
#       Rutas protegidas
# ---------------------------

@app.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.get("/admin/ping")
def admin_ping(_: User = Depends(require_role("admin"))):
    return {"ok": True, "msg": "pong from admin"}


# ---------------------------
#   Comercios (público)
# ---------------------------

@app.get("/comercios", response_model=List[ComercioRead])
def listar_comercios(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, _total = crud.list_comercios(db, page, page_size)
    return items


@app.post("/comercios", response_model=ComercioRead, status_code=status.HTTP_201_CREATED)
def crear_comercio(data: ComercioCreate, db: Session = Depends(get_db)):
    return crud.create_comercio(db, data)


# ---------------------------
#     Eventos (público)
# ---------------------------

@app.get("/eventos", response_model=List[EventoRead])
def listar_eventos(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    items, _total = crud.list_eventos(db, page, page_size)
    return items


@app.post("/eventos", response_model=EventoRead, status_code=status.HTTP_201_CREATED)
def crear_evento(data: EventoCreate, db: Session = Depends(get_db)):
    return crud.create_evento(db, data)


# ---------------------------
#   Salud / observabilidad
# ---------------------------

@app.get("/healthz", summary="Healthz")
def healthz(db: Session = Depends(get_db)):
    try:
        db.execute(text("select 1"))
        return {"ok": True, "db": "up"}
    except Exception as e:
        return {"ok": False, "db": f"error: {e.__class__.__name__}"}


@app.get("/__health", summary="Underscore Health")
def underscore_health(db: Session = Depends(get_db)):
    try:
        db.execute(text("select 1"))
        return {"ok": True, "db": "up"}
    except Exception as e:
        return {"ok": False, "db": f"error: {e.__class__.__name__}"}
