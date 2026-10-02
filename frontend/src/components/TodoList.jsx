import React from 'react';
import { Search, CheckCircle2, Inbox } from 'lucide-react';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onToggle,
  onUpdate,
  onDelete,
}) {
  return (
    <div>
      <div className="toolbar">
        <div className="filter-tabs">
          <button
            type="button"
            className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {searchQuery ? <Search size={28} /> : <Inbox size={28} />}
            </div>
            <h3>
              {searchQuery
                ? 'No matching tasks found'
                : activeFilter === 'completed'
                ? 'No completed tasks yet'
                : activeFilter === 'active'
                ? 'All caught up! No active tasks'
                : 'No tasks yet'}
            </h3>
            <p>
              {searchQuery
                ? 'Try tweaking your search keywords.'
                : 'Add a new task above to get started.'}
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
