# 🛒 Simple E-commerce Backend (Node.js + Express + PostgreSQL + Prisma)

This is a basic e-commerce backend built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma ORM**. It also integrates **Cloudinary** for managing product images.

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Cloudinary (for image storage)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   npm install
   DATABASE_URL="your_postgres_connection_string"
   
2.Install dependencies
npm install

3.Set up environment variables
Create a .env file in the root directory:

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
PORT=5000

4.Run database migrations
npx prisma migrate dev

5.Start the development server
npm run dev
