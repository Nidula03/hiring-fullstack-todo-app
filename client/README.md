# TODO Frontend

## Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

The app will open automatically at `http://localhost:3000`

## Backend Connection

The frontend connects to the backend API at `http://localhost:8000`.

**Make sure the backend is running:**
```bash
cd ../server
node index.js
```

## Features

✓ **View TODOs** - Display all tasks in a clean list
✓ **Create TODO** - Add new tasks with title and optional description
✓ **Edit TODO** - Update task title and/or description
✓ **Mark as Done** - Toggle completion status with checkboxes
✓ **Delete TODO** - Remove tasks from the list
✓ **Strikethrough** - Completed tasks show with strikethrough styling
✓ **Empty State** - Friendly message when no tasks exist
✓ **Error Handling** - Display error messages if API calls fail
✓ **Responsive Design** - Works on desktop and mobile

## Component Structure

```
src/
├── App.js              # Main component with state & API calls
├── App.css             # App styling
├── index.js            # React entry point
├── index.css           # Global styles
└── components/
    ├── TodoForm.js     # Create new TODO form
    ├── TodoForm.css    # Form styling
    ├── TodoList.js     # List container
    ├── TodoList.css    # List styling
    ├── TodoItem.js     # Individual TODO item
    └── TodoItem.css    # Item styling
```

## Build

To create a production build:
```bash
npm run build
```

The build folder is ready to be deployed.

## Assumptions & Limitations

- Requires Node.js and npm installed
- Backend must be running on port 8000
- No user authentication implemented
- Real-time sync not implemented (refresh to see updates from other clients)
- No offline support
- MongoDB connection required for backend

## Tech Stack

- **React 18** - UI library
- **React Scripts** - Build tool
- **Fetch API** - HTTP requests to backend
