# SITD — Validación de Stack (MVP Final)

Portal web + API en **FastAPI + PostgreSQL + React/Vite**, todo en **Docker Compose**, listo para desarrollo local y despliegue posterior en **GCP (Cloud Run / Cloud SQL)**.

---

## 📦 Prerrequisitos
- Windows 11 + Docker Desktop (con WSL2)
- **NO** necesitás instalar Python ni Node localmente
- Navegador para acceder a Swagger y al Frontend

---

## 🏗️ Estructura del proyecto
```
validacion-stack/
├─ .env                  # credenciales y JWT (local dev)
├─ docker-compose.yml    # orquesta db/api/web
├─ README.md
├─ .gitignore
├─ api/
│  ├─ Dockerfile
│  ├─ requirements.txt
│  └─ app/
│     ├─ main.py         # endpoints, auth y admin/ping
│     ├─ db.py
│     ├─ models.py
│     ├─ schemas.py
│     ├─ security.py     # JWT, hashing, roles
│     └─ settings.py     # lectura de variables (.env)
└─ web/
   ├─ Dockerfile
   ├─ package.json
   ├─ index.html
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      └─ api.js
```

---

## 🔐 Variables de entorno (dev)

Crear archivo `.env` en la raíz (ya lo tenés configurado):

```
# === Postgres (contenedor db) ===
POSTGRES_DB=appdb
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppass

# === JWT (solo desarrollo) ===
JWT_SECRET=dev_super_secreto_cambialo
JWT_ALG=HS256
JWT_EXP_MIN=60

# === SQLAlchemy ===
DATABASE_URL=postgresql+psycopg2://appuser:apppass@db:5432/appdb
```

> 💡 También podés incluir un `.env.example` sin secretos en el repo.

---

## ▶️ Primer arranque (Windows PowerShell)

Desde la carpeta raíz:

```powershell
cd "C:\Users\Equipo\Documents\validacion-stack"
docker compose up -d --build
```

Luego abrí en el navegador:
- **API:** http://localhost:8000  
- **Swagger:** http://localhost:8000/docs  
- **Frontend:** http://localhost:5173  

---

## 🧩 Endpoints principales (Swagger)

| Ruta | Método | Descripción |
|------|---------|-------------|
| `/ping` | GET | Verifica que la API esté viva (público) |
| `/auth/register` | POST | Crear usuario (admin, user, etc.) |
| `/auth/token` | POST | Login (devuelve JWT) |
| `/me` | GET | Info del usuario autenticado |
| `/admin/ping` | GET | Test protegido, requiere rol `admin` |

### Ejemplo de flujo básico
1. **Registrar usuario:**
   ```json
   {
     "email": "admin@sitd.xyz",
     "password": "Admin123!",
     "role": "admin"
   }
   ```
2. **Obtener token:**  
   - `username`: `admin@sitd.xyz`  
   - `password`: `Admin123!`  
   Copiá el `access_token`.
3. **Authorize (candado en Swagger)** → pegá el token (`Bearer ...`)
4. **Probar `/me`** → devuelve tus datos  
5. **Probar `/admin/ping`** → responde:  
   ```json
   {
     "ok": true,
     "msg": "pong from admin",
     "email": "admin@sitd.xyz",
     "role": "admin"
   }
   ```

---

## 🧰 Comandos útiles

**Apagar todo:**
```powershell
docker compose down
```

**Reiniciar solo la API (para aplicar cambios):**
```powershell
docker compose restart api
```

**Reconstruir desde cero:**
```powershell
docker compose build --no-cache api
```

**Ver logs en vivo:**
```powershell
docker compose logs -f api
```

---

## 🧹 Limpieza opcional

**Eliminar contenedores, imágenes y caché:**
```powershell
docker compose down -v
docker system prune -a -f
```

---

## 🧪 Base de datos (si necesitás entrar)
```powershell
docker compose exec db psql -U appuser -d appdb
```
Comandos útiles dentro de `psql`:
```sql
\dt     -- listar tablas
SELECT * FROM users;
```

---

## 🌐 CORS
Configurado para permitir:
```
http://localhost:5173
```

---

## 🧩 Archivos auxiliares recomendados

### `.gitignore`
```
.env
*.log
__pycache__/
*.pyc
venv/
.venv/
alembic.ini.bak
web/node_modules/
web/dist/
db_data/
.vscode/
.idea/
```

### `.env.example`
```
POSTGRES_DB=appdb
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppass
JWT_SECRET=dev_super_secreto_cambialo
JWT_ALG=HS256
JWT_EXP_MIN=60
DATABASE_URL=postgresql+psycopg2://appuser:apppass@db:5432/appdb
```

---

## 🚀 Próximos pasos propuestos
1. ✅ Autenticación JWT + Roles implementados  
2. 📊 Agregar CRUD de entidades reales (Comercios, Eventos, etc.)  
3. 🔄 Configurar CI/CD (GitHub Actions)  
4. ☁️ Desplegar en GCP (Cloud Run + Cloud SQL)  
5. 🧠 Integrar métricas / analítica básica  

---

📘 **Autor:** Equipo SITD (UTEC Minas)  
🧑‍💻 **Stack:** FastAPI · React + Vite · PostgreSQL · Docker  
📅 **Etapa:** Anteproyecto (7.º Semestre, Validación de Stack)
