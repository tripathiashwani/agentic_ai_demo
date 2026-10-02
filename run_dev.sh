#!/usr/bin/env bash
# Script to launch both Django backend and React frontend concurrently

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Detect virtual environment
if [ -f "$PROJECT_ROOT/venv/bin/python" ]; then
  PYTHON_BIN="$PROJECT_ROOT/venv/bin/python"
elif [ -f "$PROJECT_ROOT/../venv/bin/python" ]; then
  PYTHON_BIN="$PROJECT_ROOT/../venv/bin/python"
else
  PYTHON_BIN="python3"
fi

echo "Starting Django Backend on http://127.0.0.1:8000..."
"$PYTHON_BIN" "$PROJECT_ROOT/manage.py" runserver 0.0.0.0:8000 &
BACKEND_PID=$!

echo "Starting React Frontend on http://127.0.0.1:5173..."
cd "$PROJECT_ROOT/frontend" && npm run dev &
FRONTEND_PID=$!

cleanup() {
  echo ""
  echo "Shutting down servers..."
  kill "$BACKEND_PID" 2>/dev/null
  kill "$FRONTEND_PID" 2>/dev/null
  exit 0
}

trap cleanup INT TERM

wait
