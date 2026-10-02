const API_BASE = '/api/todos';

export async function fetchTodos({ filter = 'all', search = '' } = {}) {
  const params = new URLSearchParams();
  if (filter === 'completed') {
    params.append('completed', 'true');
  } else if (filter === 'active') {
    params.append('completed', 'false');
  }
  if (search.trim()) {
    params.append('search', search.trim());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${API_BASE}/${queryString}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
}

export async function createTodo(todoData) {
  const response = await fetch(`${API_BASE}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.title?.[0] || 'Failed to create task');
  }
  return response.json();
}

export async function updateTodo(id, updates) {
  const response = await fetch(`${API_BASE}/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to update task');
  }
  return response.json();
}

export async function toggleTodo(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle/`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle task status');
  }
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE}/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to delete task');
  }
  return true;
}
