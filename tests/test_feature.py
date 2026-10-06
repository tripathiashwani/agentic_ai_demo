import pytest
from pathlib import Path

# Path to the TodoList component
TODO_LIST_PATH = Path('frontend/src/components/TodoList.jsx')

@pytest.fixture
def todo_list_content():
    return TODO_LIST_PATH.read_text()

def test_priority_filter_dropdown(todo_list_content):
    assert 'priority-filter' in todo_list_content
    assert 'select' in todo_list_content
    assert 'High' in todo_list_content
    assert 'Medium' in todo_list_content
    assert 'Low' in todo_list_content
    assert 'All' in todo_list_content

def test_on_priority_change_handler(todo_list_content):
    assert 'onPriorityChange' in todo_list_content

def test_preserves_existing_filters(todo_list_content):
    assert 'onFilterChange' in todo_list_content
    assert 'onSearchChange' in todo_list_content

# Additional tests for functional requirements
@pytest.mark.parametrize('input_priority, expected_status', [
    ('High', 'ok'),
    ('Medium', 'ok'),
    ('InvalidOption', 'error'),
    ('Low', 'ok'),
])
def test_priority_filter_functionality(input_priority, expected_status):
    # Simulate the filtering logic and assert the expected outcomes
    pass  # Implement the logic to test filtering based on input_priority
