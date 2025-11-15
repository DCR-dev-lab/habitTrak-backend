# HabitTrak Backend API

HabitTrak is a productivity-focused habit tracking system with insights, streak tracking, check-ins, reminders, and optional challenge mode.
This repository contains the backend REST API built with Node.js, Express, and MongoDB (Mongoose).

## 🚀 Features

### 🔐 Authentication
- **User registration & login** (JWT)
- **Protected routes** using middleware

### 📘 Habits
- **Create / Edit / Delete habits**
- **Frequency, category, and priority** support

### ✅ Check-ins
- **Mark habit as completed**
- **Automatic streak calculation**
- **One check-in per day per habit**

### 📊 Insights
- **Strongest / weakest habit**
- **Weekly progress** (7 days)
- **Monthly progress** (30 days)
- **Overview for all habits**

### 🔔 Reminders
- **Create / Delete reminders**
- **Stores time and message**

### 🏆 Challenge Mode (Minimal Version)
- **Create challenges**
- **Join challenges**
- **Participant count**
- **View all challenges**

## 📦 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **CORS**
- **dotenv**

## 📁 Project Structure
habitTrak-backend
│── config/
│ └── db.js
│── controllers/
│── middleware/
│── models/
│── routes/
│── server.js
│── .env
└── package.json

text

## 🛠️ Setup Instructions

### 1. Install dependencies
```bash
npm install
```
2. Create a .env file
env
```PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
```
3. Start server
```bash
npm run start
```
🔗 API Base URL
/api

✔ Status
-Backend: 100% complete

-Tested via Postman

-Fully connected with the frontend
