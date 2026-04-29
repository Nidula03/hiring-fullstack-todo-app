import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ComicText } from './components/ComicText';
import { DotPattern } from './components/DotPattern';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/todos';
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000';

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Listen for real-time events
    newSocket.on('todo:created', (newTodo) => {
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    });

    newSocket.on('todo:updated', (updatedTodo) => {
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
      );
    });

    newSocket.on('todo:toggled', (updatedTodo) => {
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
      );
    });

    newSocket.on('todo:deleted', (deletedId) => {
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== deletedId));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching from:', API_BASE);
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      console.log('Todos fetched:', data);
      setTodos(data);
    } catch (err) {
      const errorMsg = `Failed to fetch todos: ${err.message}`;
      console.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, description) => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Failed to create todo');
      await response.json();
      // Real-time update will happen via socket event
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const updateTodo = async (id, title, description) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      await response.json();
      // Real-time update will happen via socket event
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const toggleDone = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/${id}/done`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to toggle todo');
      await response.json();
      // Real-time update will happen via socket event
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      await response.json();
      // Real-time update will happen via socket event
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <>
      <DotPattern width={32} height={32} glow={true} />
      <div className="app">
        <div className="container">
          <header className="app-header">
            <ComicText fontSize={3}>My TODO App</ComicText>
            <p>Organize your tasks</p>
          </header>

          {error && <div className="error-message">{error}</div>}

          <TodoForm onAddTodo={addTodo} />

          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : (
            <TodoList
              todos={todos}
              onUpdateTodo={updateTodo}
              onToggleDone={toggleDone}
              onDeleteTodo={deleteTodo}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
