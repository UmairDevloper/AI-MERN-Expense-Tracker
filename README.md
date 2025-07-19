# 💸 MERN Expense Tracker App

A powerful, full-stack **Expense Tracker** application built with the **MERN stack** (MongoDB, Express, React, Node.js). It supports **Google Authentication**, **real-time charting** with **Chart.js**, and full **CRUD operations** for expense tracking.

---

## 🚀 Features

- 🔐 **Google Authentication (G-Library)**  
- 📊 **Chart.js**-based expense visualization  
- 💳 Full **CRUD** operations on expenses  
- 🧾 Add categories like Food, Travel, Rent, etc.  
- 📆 Filter by date range, category, or type  
- 📈 Monthly/Yearly expense trends  
- 💠 Responsive and user-friendly UI  
- 🧱 Clean modular code structure (MERN)

---

## 🛠️ Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | React.js, Tailwind / CSS3     |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB with Mongoose         |
| Auth       | Google OAuth2 (G-Library)     |
| Charts     | Chart.js                      |

---

## 🗂️ Folder Structure

mern-expense-tracker/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── services/ # API calls
│ │ └── App.js
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
├── .env
├── README.md



## 📊 Chart Overview

- Uses **Chart.js** for dynamic visualization.
- **Pie Chart** for category-wise distribution.
- **Bar Chart** for monthly tracking.
- **Line Chart** for overall trends.
- Fully responsive on desktop/mobile.

---

## 🔐 Google Authentication

- Integrated with **Google Login** using OAuth 2.0 via **G-Library**.
- One-click sign-in/sign-out.
- Stores user sessions securely via JWT + Cookies.

---

## 💳 Expense Operations

| Operation | Endpoint              | Description              |
|-----------|-----------------------|--------------------------|
| Create    | `POST /api/expenses`  | Add a new expense        |
| Read      | `GET /api/expenses`   | View all expenses        |
| Update    | `PUT /api/expenses/:id` | Edit an existing expense |
| Delete    | `DELETE /api/expenses/:id` | Remove an expense     |

---

## ⚙️ Getting Started

### 1. Clone the Repository


git clone https://github.com/UmairDevloper/mern-expense-tracker.git
cd mern-expense-tracker
2. Setup Server

cd server
npm install
Create a .env file:


PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
3. Setup Client

cd client
npm install
Create .env in /client:


REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
4. Run App

# In root directory
npm run dev
📬 Future Enhancements
Add income tracking + profit/loss analytics

PDF/CSV export of transactions

Dark mode UI

Push notifications for spending alerts

Multi-user dashboard (admin + users)

🙌 Author
Developed with ❤️ by Muhammad Umair Ullah

