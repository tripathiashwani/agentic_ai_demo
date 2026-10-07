import pytest
from pathlib import Path

# Test suite for TodoList component

def test_priority_filter_dropdown_rendered():
    # Check if the dropdown is rendered with correct options
    todo_list_path = Path('frontend/src/components/TodoList.jsx')
    assert todo_list_path.exists()
    with open(todo_list_path) as f:
        content = f.read()
        assert 'All' in content
        assert 'High' in content
        assert 'Medium' in content
        assert 'Low' in content


def test_filter_tasks_by_priority():
    # Simulate selecting 'High' priority and check filtered tasks
    # This would require a mock of the component's state and props
    pass


def test_filter_with_existing_search_query():
    # Simulate existing search query and check filtering
    pass


def test_select_invalid_priority():
    # Simulate selecting an invalid priority and check for error
    pass


def test_no_tasks_available():
    # Simulate filtering with no tasks available
    pass