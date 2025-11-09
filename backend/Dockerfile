# Gunakan base image Python 3.9
FROM python:3.9-slim

# Set folder kerja di dalam container
WORKDIR /app

# Salin file requirements
COPY requirements.txt .

# Install dependencies dari requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file dari folder backend
COPY . .

# Port yang akan diekspos oleh container
EXPOSE 8001

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]