# Target Application Context: Full-Stack To-Do Application

## 1. High-Level Architecture
This repository contains a full-stack, production-structured Web Application:
- **Backend**: Python 3.11, Django 4.x, Django REST Framework, SQLite (`backend/`, `todos/`).
- **Frontend**: React 18 (Vite), Lucide React icons, Vanilla CSS (`frontend/src/`).
- **Database**: SQLite (`db.sqlite3`).

---

## 2. Directory & Component Catalog

### Frontend (`frontend/src/`)
- `App.jsx`: Root dashboard component. Manages application state (`todos`, `loading`, `activeFilter`, `searchQuery`), coordinates API calls, and renders child components.
- `api.js`: Axios client configuring `VITE_API_URL` (default: `http://localhost:8000/api`). Contains `fetchTodos()`, `createTodo(data)`, `updateTodo(id, data)`, `toggleTodo(id, completed)`, `deleteTodo(id)`.
- `index.css`: Global design system, color variables, CSS animations, responsive layouts, and theme styles.
- `components/Header.jsx`: Top navigation header, branding title ('Full-Stack Task Manager'), and future theme / settings toggles.
- `components/TodoList.jsx`: Renders the list of tasks or empty state when no tasks match the active filter.
- `components/TodoItem.jsx`: Individual task card. Supports inline editing, completion toggle checkbox, date format, and delete action.
- `components/TodoForm.jsx`: New task input form with title, optional description textarea, and submit button.
- `components/Stats.jsx`: Counter badges for Total, Active, and Completed tasks.

### Backend (`todos/` & `backend/`)
- `todos/models.py`: `Todo` model with `title` (CharField), `description` (TextField), `completed` (BooleanField), `created_at`, `updated_at`.
- `todos/serializers.py`: `TodoSerializer` serializing all model fields.
- `todos/views.py`: `TodoViewSet` providing standard DRF ModelViewSet actions (`list`, `create`, `retrieve`, `update`, `partial_update`, `destroy`) with optional search query filtering.
- `todos/urls.py`: DefaultRouter routing `/api/todos/` to `TodoViewSet`.
- `todos/tests.py`: Django `TestCase` testing model operations and REST API endpoints.
- `backend/settings.py`: Django settings with `corsheaders`, `rest_framework`, `todos` app enabled.

---

## 3. Engineering Guidelines for AI Agents
1. **Always modify existing components**:
   - If a request is for the Header (e.g. dark mode, theme switch, brand logo) -> modify `frontend/src/components/Header.jsx` and `frontend/src/index.css`.
   - If a request is for filtering / searching / exporting (e.g. date search, CSV export) -> modify `frontend/src/components/TodoList.jsx` or `frontend/src/App.jsx` and add helper in `frontend/src/api.js`.
   - If a request is for backend data model / validation / endpoints -> modify `todos/models.py`, `todos/views.py`, and `todos/serializers.py`.
2. **Never create orphan root scripts**:
   - Do NOT create `src/main.py` or `src/theme.py`. Always integrate directly into `frontend/src/` or `todos/`.
3. **Preserve existing contracts**:
   - Keep existing props, component names, and API route signatures intact.
