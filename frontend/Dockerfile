# Gunakan base image Node.js 16
FROM node:20-alpine

# Set folder kerja di dalam container
WORKDIR /app

# Salin package.json dan yarn.lock
COPY package.json yarn.lock ./

# Install dependencies menggunakan yarn
RUN yarn install

# Salin semua file dari folder frontend
COPY . .

# Port yang akan diekspos oleh container
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["yarn", "start"]