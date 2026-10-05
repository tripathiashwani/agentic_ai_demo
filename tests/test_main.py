import pytest
from src.main import TaskCreator

class TestTaskCreation:
    def setup_method(self):
        self.task_creator = TaskCreator()

    def test_optional_details_field_removed(self):
        response = self.task_creator.is_optional_details_visible()
        assert response == {'field_visible': False}

    def test_create_task_success(self):
        response = self.task_creator.create_task('Test Task', 'This is a test task.')
        assert response == {'status': 'success', 'task_created': True}

    def test_create_task_missing_required_fields(self):
        response = self.task_creator.create_task('', '')
        assert response == {'status': 'error', 'message': 'Required fields are missing'}

    def test_create_task_special_characters_in_title(self):
        response = self.task_creator.create_task('!@#$%^&*()', 'Testing special characters.')
        assert response == {'status': 'success', 'task_created': True}

    def test_create_task_empty_fields(self):
        response = self.task_creator.create_task('', 'Description only.')
        assert response == {'status': 'error', 'message': 'Title is required'}