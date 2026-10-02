import React, { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await onAddTodo({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card-form">
      <h2 className="form-title">
        <PlusCircle size={18} color="var(--primary)" />
        Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="text-input"
          placeholder="What needs to be done? (e.g. Set up Django models)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <textarea
          className="textarea-input"
          placeholder="Add optional details or notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                <PlusCircle size={16} /> Add Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
