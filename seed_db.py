import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from todos.models import Todo

initial_todos = [
    {
        "title": "Set up Django REST Framework & SQLite backend",
        "description": "Configured models, serializers, viewsets, and SQLite database.",
        "completed": True,
    },
    {
        "title": "Build modern React interface with Vite",
        "description": "Implemented task stats, search, filtering, and responsive UI.",
        "completed": True,
    },
    {
        "title": "Add your first custom to-do task",
        "description": "Type into the input box above and click Add Task to test it!",
        "completed": False,
    },
]

for item in initial_todos:
    Todo.objects.get_or_create(
        title=item["title"],
        defaults={"description": item["description"], "completed": item["completed"]},
    )

print(f"Successfully seeded database. Total todos: {Todo.objects.count()}")
