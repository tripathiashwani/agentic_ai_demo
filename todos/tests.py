from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Todo


class TodoAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo1 = Todo.objects.create(
            title="First Todo",
            description="First Description",
            completed=False
        )
        self.todo2 = Todo.objects.create(
            title="Second Todo",
            description="Second Description",
            completed=True
        )

    def test_list_todos(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_todo(self):
        data = {
            "title": "New Todo",
            "description": "New description text",
            "completed": False
        }
        response = self.client.post('/api/todos/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "New Todo")
        self.assertEqual(response.data['description'], "New description text")
        self.assertFalse(response.data['completed'])
        self.assertEqual(Todo.objects.count(), 3)

    def test_retrieve_todo(self):
        response = self.client.get(f'/api/todos/{self.todo1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.todo1.title)

    def test_update_todo(self):
        data = {
            "title": "Updated Title",
            "description": "Updated Description",
            "completed": True
        }
        response = self.client.put(f'/api/todos/{self.todo1.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo1.refresh_from_db()
        self.assertEqual(self.todo1.title, "Updated Title")
        self.assertTrue(self.todo1.completed)

    def test_partial_update_todo(self):
        data = {"completed": True}
        response = self.client.patch(f'/api/todos/{self.todo1.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo1.refresh_from_db()
        self.assertTrue(self.todo1.completed)

    def test_toggle_completed_action(self):
        response = self.client.patch(f'/api/todos/{self.todo1.id}/toggle/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo1.refresh_from_db()
        self.assertTrue(self.todo1.completed)

        response2 = self.client.patch(f'/api/todos/{self.todo1.id}/toggle/')
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.todo1.refresh_from_db()
        self.assertFalse(self.todo1.completed)

    def test_delete_todo(self):
        response = self.client.delete(f'/api/todos/{self.todo1.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 1)

    def test_filter_by_completed(self):
        response = self.client.get('/api/todos/?completed=true')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.todo2.id)

    def test_search_by_title(self):
        response = self.client.get('/api/todos/?search=First')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.todo1.id)
