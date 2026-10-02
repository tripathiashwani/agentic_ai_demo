import React from 'react';
import { CheckCircle2, Layers } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo-badge">
        <Layers size={16} />
        <span>Full-Stack Task Manager</span>
      </div>
      <h1 className="app-title">React & Django To-Do</h1>
      <p className="app-subtitle">
        Powered by React on the frontend, Django REST Framework on the backend, and SQLite.
      </p>
    </header>
  );
}
