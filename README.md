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
| Login | ![<img width="1917" height="965" alt="ogin" src="https://github.com/user-attachments/assets/031da692-4e06-4003-a3d6-dd0df02d85e2" />
](screenshots/login.png) |
| Signup | ![<img width="1912" height="977" alt="signup" src="https://github.com/user-attachments/assets/8a967d16-1fcb-4247-b699-85799dd02900" />
](screenshots/signup.png) |
| Add Task | ![<img width="1910" height="967" alt="task manager" src="https://github.com/user-attachments/assets/82ab91d3-3ce7-4b25-9486-74901480cc13" />
](screenshots/add-task.png) |
| Task List | ![<img width="1912" height="970" alt="your tasks" src="https://github.com/user-attachments/assets/2b1fd55b-e689-4a40-8ec3-9c3940833411" />
](screenshots/task-list.png) |


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
