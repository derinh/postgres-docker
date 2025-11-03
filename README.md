# 🐳 Full Stack FastAPI + React + PostgreSQL (Dockerized)

A minimal full-stack web application built with **FastAPI** (backend), **React + Vite** (frontend), and **PostgreSQL** (database), all running inside **Docker** containers using `docker-compose`.

This setup includes:
- ✅ User registration and login (JWT-based authentication)
- ✅ Persistent PostgreSQL database (data survives container restarts)
- ✅ REST API built with FastAPI + SQLAlchemy + Pydantic
- ✅ Simple React frontend that communicates with the backend
- ✅ One-command startup via Docker Compose

---

## 🚀 Quick Start (Docker)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<yourusername>/<yourrepo>.git
cd <yourrepo>

2️⃣ Create a .env file in the root folder

3️⃣ Build and start all services
docker compose up --build

4️⃣ Open your app
Service	URL	Description
Frontend	http://localhost:5173	React app
Backend	http://localhost:8000	FastAPI API root
Docs	http://localhost:8000/docs	Swagger API explorer
Health	http://localhost:8000/health	Simple backend health check

🧪 Testing with curl
🟢 Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'

  🟢 Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'

  🟢 Get current user (protected)
Replace <ACCESS_TOKEN> with the value from login:
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

  🟢 Refresh tokens
curl -X POST "http://localhost:8000/auth/refresh?refresh_token=<REFRESH_TOKEN>"