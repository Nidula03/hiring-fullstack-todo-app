import React, { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    onAddTodo(title, description, dueDate);
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsExpanded(false);
    setError('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={handleTitleChange}
          onFocus={() => setIsExpanded(true)}
          className="title-input"
        />
      </div>

      {isExpanded && (
        <div className="expanded-form">
          <textarea
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            rows="3"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                setTitle('');
                setDescription('');
                setDueDate('');
                setIsExpanded(false);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
