import React, { useState } from 'react';
import { motion } from 'motion/react';
import './TodoItem.css';

function TodoItem({ todo, onUpdateTodo, onToggleDone, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdateTodo(todo._id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <motion.div
      className={`todo-item ${todo.done ? 'done' : ''}`}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggleDone(todo._id)}
        />
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-description"
              rows="2"
            />
            <div className="edit-actions">
              <button onClick={handleCancel} className="cancel-edit">
                Cancel
              </button>
              <button onClick={handleSave} className="save-edit">
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && <p className="todo-description">{todo.description}</p>}
            <small className="todo-date">
              {new Date(todo.createdAt).toLocaleDateString()}
            </small>
          </>
        )}
      </div>

      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          title="Edit"
        >
          ✎
        </button>
        <button
          onClick={() => onDeleteTodo(todo._id)}
          className="delete-btn"
          title="Delete"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

export default TodoItem;
