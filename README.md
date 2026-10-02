# Full-Stack To-Do Application (React + Django + SQLite)

A clean, modern, and responsive To-Do application built with a **Django REST Framework** backend, an **SQLite** database, and a **React (Vite)** frontend.

---

## 🚀 Features

- **Full CRUD Operations**: Create, read, update (inline editing), toggle completion, and delete tasks.
- **Search & Filtering**: Real-time keyword search across task titles and descriptions, with tabs for *All*, *Active*, and *Completed* tasks.
- **Dashboard Counters**: Live status badges showing Total, Active/Pending, and Completed counts.
- **SQLite Database**: Self-contained, zero-configuration database configured by default with Django.
- **RESTful API**: Clean API endpoints powered by Django REST Framework with CORS enabled for frontend communication.
- **Vite Proxy & Responsive UI**: Fast development setup with proxy forwarding and a polished, modern interface.

---

## 📁 Project Architecture

```
Agentic_ai_dummy_proj/
├── backend/                  # Django project configuration
│   ├── settings.py           # Configured with CORS, REST Framework, SQLite
│   ├── urls.py               # Main URL dispatcher (/api/ -> todos.urls)
│   ├── wsgi.py
│   └── asgi.py
├── todos/                    # Django app for todo items
│   ├── models.py             # Todo model (title, description, completed, timestamps)
│   ├── serializers.py        # ModelSerializer for REST API
│   ├── views.py              # TodoViewSet with filter, search, & toggle action
│   ├── urls.py               # Router registering /api/todos/
│   ├── admin.py              # Registered in Django Admin
│   └── tests.py              # Automated test suite (9 test cases)
├── frontend/                 # React application (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx    # Header and badge
│   │   │   ├── Stats.jsx     # Live counter cards
│   │   │   ├── TodoForm.jsx  # Input form to add new tasks
│   │   │   ├── TodoItem.jsx  # Task card with toggle, inline edit, delete
│   │   │   └── TodoList.jsx  # Filter toolbar, search box, list container
│   │   ├── api.js            # Fetch API client
│   │   ├── App.jsx           # Main state management & toast notifications
│   │   ├── index.css         # Modern styling and animations
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── vite.config.js        # Vite dev server + proxy configuration
│   └── package.json
├── db.sqlite3                # SQLite database file
├── manage.py                 # Django management CLI
├── seed_db.py                # Database seed script with sample tasks
└── venv/                     # Python virtual environment
```

---

## 🛠️ How to Run the Application

You can run both the Django backend and the React frontend in two terminal windows:

### 1. Start the Django Backend

```bash
# In the project root directory (/home/cron/Agentic_ai_dummy_proj)
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

The Django API will be live at:
- **API Root**: [http://localhost:8000/api/todos/](http://localhost:8000/api/todos/)
- **Django Admin**: [http://localhost:8000/admin/](http://localhost:8000/admin/)

### 2. Start the React Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The React frontend will be live at:
- **Frontend App**: [http://localhost:5173/](http://localhost:5173/)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos/` | List all tasks (supports `?search=<term>` and `?completed=true/false`) |
| `POST` | `/api/todos/` | Create a new task (`{ "title": "...", "description": "..." }`) |
| `GET` | `/api/todos/{id}/` | Retrieve a specific task by ID |
| `PATCH` / `PUT` | `/api/todos/{id}/` | Update task title, description, or status |
| `PATCH` | `/api/todos/{id}/toggle/` | Toggle task completion between true and false |
| `DELETE` | `/api/todos/{id}/` | Delete a task |

---

## 🧪 Running Tests

To run the backend test suite:

```bash
source venv/bin/activate
python manage.py test
```
