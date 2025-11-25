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

2️⃣ Enable RLS
alter table tasks enable row level security;

3️⃣ Policies
create policy "User can read own tasks"
on tasks for select using (auth.uid() = user_id);

create policy "User can insert own tasks"
on tasks for insert with check (auth.uid() = user_id);

🧩 Third-party Libraries

@supabase/supabase-js — Supabase client

tailwindcss — Utility CSS

daisyui — UI components

⚙️ Assumptions / Design Decisions

Only authenticated users can access /tasks and /tasks/new

Users can see only their own tasks

MVP contains only "Add" + "View" tasks (edit/delete optional)

⚠️ Known Issues / Limitations

No task editing or deletion in v1

No sorting/filtering options

No real-time task updates
📚 License

This project is open-source under the MIT License.

---

# 🎯 **NEXT STEP FOR YOU**
Tell me:

👉 “README created”  
and  
👉 “Screenshots added”

Then I will take you to:

### ⭐ STEP 6 — Vercel Deployment (optional but gives HUGE bonus points).

