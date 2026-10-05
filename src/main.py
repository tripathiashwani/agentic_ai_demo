class TaskCreator:
    def create_task(self, task_title, task_description):
        if not task_title and not task_description:
            return {'status': 'error', 'message': 'Required fields are missing'}
        if not task_title:
            return {'status': 'error', 'message': 'Title is required'}
        # Assuming task_description can be empty
        # Logic to create the task goes here
        return {'status': 'success', 'task_created': True}

    def is_optional_details_visible(self):
        return {'field_visible': False}