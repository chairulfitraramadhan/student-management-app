# Student Management System

Aplikasi web untuk manajemen data mahasiswa dengan fitur autentikasi JWT dan role-based access control (Admin & User).
'Test CI/CD'

## Fitur Utama

- **Autentikasi JWT**: Login dan registrasi dengan JWT token
- **Role-Based Access**:
  - **Admin**: Dapat menambah, mengedit, dan menghapus data mahasiswa
  - **User**: Dapat melihat dan mencari data mahasiswa
- **CRUD Mahasiswa**: Create, Read, Update, Delete data mahasiswa
- **Filter & Search**: Cari mahasiswa berdasarkan nama, NIM, email, program studi, dan angkatan
- **Modern UI**: Interface yang responsif dan modern dengan Tailwind CSS

## Data Mahasiswa

Setiap mahasiswa memiliki field:
- NIM (Nomor Induk Mahasiswa)
- Nama
- Email
- Program Studi
- Angkatan

## Tech Stack

### Backend
- **FastAPI**: Web framework Python modern dan cepat
- **MongoDB**: Database NoSQL
- **Motor**: Driver async MongoDB untuk Python
- **PyJWT**: JSON Web Token untuk autentikasi
- **Passlib**: Library untuk hashing password

### Frontend
- **React**: Library JavaScript untuk building UI
- **React Router**: Routing untuk SPA
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework
- **Sonner**: Toast notifications

## Prerequisites

Pastikan Anda telah menginstall:
- Python 3.8+
- Node.js 14+
- MongoDB
- Yarn (package manager)

## Instalasi dan Menjalankan Lokal

### 1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
# Edit file .env sesuai kebutuhan:
# - MONGO_URL: URL MongoDB Anda
# - DB_NAME: Nama database
# - JWT_SECRET_KEY: Secret key untuk JWT (gunakan string random yang aman)

# Jalankan server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend akan berjalan di `http://localhost:8001`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
yarn install

# Setup environment variables
# Edit file .env:
# REACT_APP_BACKEND_URL=http://localhost:8001

# Jalankan development server
yarn start
```

Frontend akan berjalan di `http://localhost:3000`

### 4. Setup MongoDB

Pastikan MongoDB berjalan di sistem Anda:

```bash
# Jalankan MongoDB (jika menggunakan service)
sudo systemctl start mongod

# Atau jalankan MongoDB secara langsung
mongod --dbpath /path/to/data/directory
```

## Akun Default

Untuk mulai menggunakan aplikasi, Anda perlu membuat akun melalui halaman registrasi.

### Membuat Admin:
1. Buka halaman registrasi
2. Isi form dengan data lengkap
3. Pilih role "Admin"
4. Klik "Daftar"

### Membuat User:
1. Buka halaman registrasi
2. Isi form dengan data lengkap
3. Pilih role "User" (default)
4. Klik "Daftar"

## API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user" // or "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Student Endpoints

#### Get All Students (with search & filter)
```http
GET /api/students?search=<query>&program_studi=<prodi>&angkatan=<year>
Authorization: Bearer <token>
```

#### Get Student by ID
```http
GET /api/students/{student_id}
Authorization: Bearer <token>
```

#### Create Student (Admin only)
```http
POST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "nim": "123456789",
  "nama": "Jane Doe",
  "email": "jane@example.com",
  "program_studi": "Teknik Informatika",
  "angkatan": 2023
}
```

#### Update Student (Admin only)
```http
PUT /api/students/{student_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nama": "Jane Doe Updated",
  "email": "jane.new@example.com"
}
```

#### Delete Student (Admin only)
```http
DELETE /api/students/{student_id}
Authorization: Bearer <token>
```

## Docker Support

Aplikasi ini sudah siap untuk containerization menggunakan Docker. Struktur frontend dan backend terpisah memudahkan untuk membuat Docker container individual.

### Contoh Dockerfile untuk Backend

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Contoh Dockerfile untuk Frontend

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=student_management_db
      - JWT_SECRET_KEY=your-secret-key
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    depends_on:
      - backend

volumes:
  mongodb_data:
```

## Security Notes

1. **JWT Secret Key**: Pastikan menggunakan secret key yang kuat dan random untuk production
2. **Password**: Password di-hash menggunakan bcrypt sebelum disimpan ke database
3. **CORS**: Konfigurasi CORS sudah diatur, pastikan untuk membatasi origin di production
4. **HTTPS**: Gunakan HTTPS untuk production deployment

## Fitur UI

- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Modern Interface**: Menggunakan gradient dan glass-morphism effect
- **Interactive Elements**: Smooth transitions dan hover effects
- **Toast Notifications**: Feedback visual untuk setiap action
- **Modal Forms**: Form untuk tambah/edit data dalam modal
- **Real-time Search**: Filter dan search yang responsive

## Testing

### Test Backend API dengan curl:

```bash
# Register
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123","name":"Admin User","role":"admin"}'

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'

# Get Students (replace TOKEN with actual token)
curl -X GET http://localhost:8001/api/students \
  -H "Authorization: Bearer TOKEN"
```
