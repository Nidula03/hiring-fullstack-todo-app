# TODO Backend

## Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment variables**
   The `.env` file is included with your MongoDB Atlas connection string and PORT setting

3. **Run the server**
   ```bash
   node index.js
   ```

The server will run on `http://localhost:8000`

## MongoDB Connection

Using **MongoDB Atlas** (Cloud):
- Connection string stored in `.env` file
- Database: Cluster0
- Already configured and working

To use a local MongoDB instead:
1. Install MongoDB locally
2. Update `.env` with: `MONGODB_URI=mongodb://localhost:27017/todo-app`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO |
| PUT | `/api/todos/:id` | Update a TODO |
| PATCH | `/api/todos/:id/done` | Toggle done status |
| DELETE | `/api/todos/:id` | Delete a TODO |

## API Examples

**Create a TODO:**
```bash
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk and eggs"}'
```

**Get all TODOs:**
```bash
curl http://localhost:8000/api/todos
```

## Tech Stack

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Enable frontend communication
- **dotenv** - Environment variables

## Assumptions & Limitations

- MongoDB Atlas connection required (or local MongoDB)
- No authentication implemented
- No data validation beyond required fields
- No rate limiting
