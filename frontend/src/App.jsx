import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from './api';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      showToast(err.message || 'Failed to load tasks from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
      showToast('Task added successfully!');
    } catch (err) {
      showToast(err.message || 'Could not create task', 'error');
      throw err;
    }
  };

  const handleToggleTodo = async (id) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      // Revert on error
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      showToast('Could not update task status', 'error');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updated = await updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      showToast('Task updated successfully!');
    } catch (err) {
      showToast(err.message || 'Could not update task', 'error');
      throw err;
    }
  };

  const handleDeleteTodo = async (id) => {
    const originalTodos = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTodo(id);
      showToast('Task deleted');
    } catch (err) {
      setTodos(originalTodos);
      showToast(err.message || 'Could not delete task', 'error');
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'completed'
          ? todo.completed
          : !todo.completed;

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (todo.description &&
              todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [todos, activeFilter, searchQuery]);

  return (
    <div className="app-wrapper">
      <div className="container">
        <Header />

        <Stats todos={todos} />

        <TodoForm onAddTodo={handleAddTodo} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
            <p>Loading tasks from database...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <footer className="app-footer">
        Built with <span className="tech-badge">React 18</span> +{' '}
        <span className="tech-badge">Django 6</span> +{' '}
        <span className="tech-badge">SQLite</span>
      </footer>
    </div>
  );
}
