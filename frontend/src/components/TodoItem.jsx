import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, CheckSquare, Calendar } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    try {
      setIsSaving(true);
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div
        className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="text-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
              disabled={isSaving}
              autoFocus
            />
            <textarea
              className="textarea-input"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task details/notes"
              disabled={isSaving}
            />
            <div className="edit-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X size={14} /> Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!editTitle.trim() || isSaving}
              >
                <CheckSquare size={14} /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="todo-header">
              <h3 className="todo-title">{todo.title}</h3>
            </div>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} /> {formatDate(todo.created_at)}
              </span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIsEditing(true)}
            title="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            className="icon-btn delete"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
