# NoteSpace — Simple & Secure Notes Taking App

**NoteSpace** is a modern, full-stack notes management web application that allows users to securely create, edit, organize, and manage notes with a beautiful and responsive UI.
The project focuses on **clean UX**, **secure authentication**, and **scalable backend architecture**.

🔗 **Live Website:**
[https://note-space-simple-and-secure-notes.vercel.app/](LINK) 
---

## Features

### Authentication & Security

* User Signup & Login using **JWT Authentication**
* Protected routes (Dashboard & Profile)
* Secure password hashing using **bcrypt**
* Token-based session handling

### Notes Management

* Create, Edit, Delete notes
* Search notes by title
* Add tags to notes
* Notes are **user-specific**
* Colorful, aesthetic note cards

### Dashboard

* Displays all notes of the logged-in user
* Responsive grid layout (Mobile, Tablet, Desktop)
* Smooth hover & transition effects
* Floating “Add Note” action button
* Modal popup for creating/editing notes

### User Profile

* View user details
* Update profile name
* Display total notes count
* Profile protected via authentication

## 🛠 Tech Stack

### Frontend

* **React (Vite)**
* **Tailwind CSS**
* **React Router DOM**
* **Axios**
* **Lucide Icons**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **CORS**

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## Project Structure

```
NoteSpace/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🔄 Application Workflow

### 1️⃣ Authentication Flow

* User signs up → credentials stored securely
* User logs in → JWT token generated
* Token stored in browser storage
* Protected routes verify token before access

### 2️⃣ Notes Flow

* User logs in → redirected to Dashboard
* Notes fetched using authenticated API call
* Create/Edit/Delete operations update database
* UI updates in real-time

### 3️⃣ Profile Flow

* Fetch logged-in user details
* Display profile info
* Update profile name
* Navigate back to dashboard

---

## Author

**Your Name**
🔗 GitHub: [Click here](https://github.com/priyagupta-js)
🔗 LinkedIn: [Click here](https://www.linkedin.com/in/priyagupta-js/)

---
