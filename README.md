# Task Manager — SvelteKit + Supabase + TailwindCSS + DaisyUI

A simple task management application built as part of the **Proxie Studio Frontend Intern Assignment**.  
The application allows users to sign up, log in, manage tasks, and stay authenticated using Supabase.

---

## 🚀 Tech Stack
- **SvelteKit**
- **Supabase Authentication + Database**
- **TailwindCSS**
- **DaisyUI Components**
- **Vite**

---

## 📸 Screenshots

| Page | Screenshot |
|------|------------|
| Login | ![](screenshots/login.png) |
| Signup | ![](screenshots/signup.png) |
| Add Task | ![](screenshots/add-task.png) |
| Task List | ![](screenshots/task-list.png) |


---

## 📦 Features

### 🔐 Authentication
- Email/password signup
- Login with session persistence
- Protected routes (unauthenticated users redirected to login)
- Logout functionality

### 📝 Task Management
- Add new tasks with:
  - Title
  - Description
  - Priority (Low/Medium/High)
  - Due Date
  - Status (default: Pending)
- View all user-specific tasks
- Clean DaisyUI card layout

### 🎨 UI / UX
- Responsive layout
- Modern TailwindCSS styling
- DaisyUI components for faster UI development
- Navigation bar

---

## 🛠️ Setup Instructions

### 1️⃣ Clone repository
```bash
git clone https://github.com/YOUR_USERNAME/sveltekit-task-manager.git
cd sveltekit-task-manager
