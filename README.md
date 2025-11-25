<div align="center">
</div> <h1 align="center">Task Manager — SvelteKit + Supabase</h1> <p align="center"> A minimal, fast and fully authenticated Task Manager built as part of the Proxie Studio Frontend Intern Assignment. </p> <p align="center"> <img src="https://img.shields.io/badge/SvelteKit-Framework-orange"/> <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green"/> <img src="https://img.shields.io/badge/TailwindCSS-Utility%20CSS-blue"/> <img src="https://img.shields.io/badge/DaisyUI-Components-pink"/> <img src="https://img.shields.io/badge/Status-Completed-success"/> </p>
**Task Manager — Built with SvelteKit, Supabase & TailwindCSS**

A clean and minimal task manager built for the Proxie Studio Frontend Intern Assignment.
The app provides a smooth flow for creating an account, logging in, and managing personal tasks — all backed by Supabase authentication and database.

---

**🚀 Tech Stack**
SvelteKit – Application framework

Supabase – Auth + Postgres DB

TailwindCSS – Utility-first styling

DaisyUI – Pre-styled UI components

Vite – Fast development and bundling

---

## 📸 Screenshots

| Page | Screenshot |
|------|------------|
| Login |<img width="1917" height="867" alt="login" src="https://github.com/user-attachments/assets/cb9fb829-3685-4787-bbdc-0d2f041b80ac" /><img width="1918" height="867" alt="login2" src="https://github.com/user-attachments/assets/93e5fe6f-ebfd-4513-ac31-5919bdb1c79d" />|
| Signup |<img width="1918" height="873" alt="signup" src="https://github.com/user-attachments/assets/21d42550-cbe4-49c3-9ccb-e04fdd7eeea8" /><img width="1918" height="870" alt="signup2" src="https://github.com/user-attachments/assets/ffb105f0-5c10-44a7-af67-95750119b294" />|
| Add Task |<img width="1918" height="863" alt="task1" src="https://github.com/user-attachments/assets/5439515e-6965-4697-b3a3-629829b7ea73" /><img width="1918" height="868" alt="task2" src="https://github.com/user-attachments/assets/0da2f078-eb3e-4891-a4d3-455c01bb5e3e" />|
| Task List |<img width="1917" height="867" alt="showtask1" src="https://github.com/user-attachments/assets/41a43645-34ca-45c2-b217-437536144fe0" /><img width="1918" height="872" alt="showtask2" src="https://github.com/user-attachments/assets/5a3443bb-a539-4e49-86a4-cc4111a7fe79" />|


---

**✨ Features**
🔐 Authentication
Email/password signup & login
Session handling with Supabase
Route protection (only logged-in users can access tasks)
Logout with session cleanup

**📝 Task Management**
  Create tasks with:
  Title
  Description
  Priority (Low / Medium / High)
  Due date
  Each user sees only their own tasks
  Tasks displayed in clean DaisyUI cards

**🎨 Interface**
Fully responsive
Tailwind + DaisyUI theming
Simple navigation bar
Light/Dark theme toggle

---

## 🛠️ Setup Instructions

 1️⃣ Clone repository
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

This project is open-source under the MIT License.





