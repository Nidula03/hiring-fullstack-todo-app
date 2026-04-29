import React from 'react';
import { AnimatePresence } from 'motion/react';
import TodoItem from './TodoItem';
import { AnimatedList } from './AnimatedList';
import './TodoList.css';

function TodoList({ todos, onUpdateTodo, onToggleDone, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <AnimatePresence>
        <AnimatedList>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdateTodo={onUpdateTodo}
              onToggleDone={onToggleDone}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </AnimatedList>
      </AnimatePresence>
    </div>
  );
}

export default TodoList;
