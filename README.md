# Full Stack TODO Application

A complete full-stack TODO application built with React, Express, and MongoDB.

## Features

- ✓ View, Create, Edit, and Delete TODO items
- ✓ Mark tasks as done/undone
- ✓ Beautiful, responsive UI
- ✓ Full REST API backend
- ✓ MongoDB persistence
- ✓ Form validation
- ✓ Error handling

## Quick Start

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB)
- Two terminal windows

### 1. Start the Backend Server

```bash
cd server
npm install  # if not already done
node index.js
```

Expected output:
```
Server running on port 8000
MongoDB connected
```

### 2. Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm install  # if not already done
npm start
```

The app will automatically open at `http://localhost:3000`

## Project Structure

```
hiring-fullstack-todo/
├── server/
│   ├── models/
│   │   └── Todo.js          # MongoDB schema
│   ├── routes/
│   │   └── todos.js         # API endpoints
│   ├── index.js             # Express server
│   ├── package.json
│   ├── .env                 # Database connection string
│   └── README.md
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all TODOs |
| POST | `/api/todos` | Create a new TODO |
| PUT | `/api/todos/:id` | Update a TODO |
| PATCH | `/api/todos/:id/done` | Toggle done status |
| DELETE | `/api/todos/:id` | Delete a TODO |

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **Socket.IO Client** - Real-time updates
- **CSS3** - Styling with animations
- **Fetch API** - HTTP requests
- **Motion** - Animation library

### Database
- **MongoDB Atlas** - Cloud database

## Environment Setup

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
PORT=8000
NODE_ENV=development
```

## Building for Production

### Build the frontend:
```bash
cd client
npm run build
```

The optimized build will be in `client/build/`

## Key Features Implemented

- ✅ All required API endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Real-time updates with Socket.IO
- ✅ Form validation
- ✅ Error handling and user feedback
- ✅ Responsive design
- ✅ Clean, modern UI with gradients and animations
- ✅ Component-based architecture
- ✅ Environment-based configuration
- ✅ Multi-client synchronization

## Assumptions & Limitations

- MongoDB Atlas connection required (credentials in .env)
- No user authentication
- Single user operation
- No offline support

## Setup Notes

- Backend runs on **port 8000** with Socket.IO for real-time updates
- Frontend runs on **port 3000**
- All connected clients receive instant updates via Socket.IO
- All data persists in MongoDB

---

For detailed setup instructions, see:
- [Backend README](server/README.md)
- [Frontend README](client/README.md)
