# api/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from .db import Base, engine, SessionLocal
from .models import User
from .schemas import UserCreate, UserRead, Token
from .security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_role,
)

app = FastAPI(title="SITD API", version="0.1.0")

# --- CORS (ajusta los orígenes según necesites) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependencia de DB por request ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Crear tablas una vez ---
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# --- Endpoints públicos ---

@app.post("/auth/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    # pydantic ya valida email; límite de 72 bytes por compatibilidad
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

# --- Endpoints protegidos ---

@app.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/admin/ping")
def admin_ping(_: User = Depends(require_role("admin"))):
    return {"ok": True, "msg": "pong from admin"}
