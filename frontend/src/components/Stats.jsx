import React from 'react';
import { ListTodo, Clock, CheckCircle } from 'lucide-react';

export default function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <ListTodo size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon active">
          <Clock size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{active}</span>
          <span className="stat-label">Active / Pending</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <CheckCircle size={20} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </div>
  );
}
