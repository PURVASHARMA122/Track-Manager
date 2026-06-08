## Deployment Note

Task data is stored in a local JSON file (`data/tasks.json`), which works well in a local development environment.

When deployed on Vercel, file-system changes are not guaranteed to persist due to the serverless architecture. For a production-ready application, a persistent database such as MongoDB, PostgreSQL, or SQLite would be used instead.


# Task Manager

A full-stack Task Manager application built with Next.js 15, JavaScript, Tailwind CSS, and Next.js API Routes. The application allows users to create, edit, complete, search, filter, and delete tasks. Task data is persisted using a JSON file, ensuring tasks remain available across server restarts without requiring a database.

## Features

### Core Features

* Create new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as complete or incomplete
* View all tasks sorted by newest first
* Search tasks by title or description
* Filter tasks by status:

  * All
  * Active
  * Completed

### Additional Features

* Active and Completed task statistics
* Overdue task highlighting
* Responsive design for desktop and mobile
* Modern UI built with Tailwind CSS
* Persistent storage using JSON file

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* Tailwind CSS
* shadcn/ui
* Lucide React Icons

### Backend

* Next.js Route Handlers (API Routes)
* Node.js File System (`fs/promises`)
* UUID

### Storage

* JSON File (`data/tasks.json`)

---

## Live Demo

Add deployment URL here:

Frontend:

```txt
https://track-manager-delta.vercel.app/
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/PURVASHARMA122/Track-Manager.git
```

### Navigate to Project

```bash
cd task-manager
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run at:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
task-manager/
│
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│   │
│   ├── layout.js
│   ├── page.jsx
│   └── globals.css
│
├── components/
│   ├── EditTaskModal.jsx
│   ├── FilterBar.jsx
│   ├── SearchBar.jsx
│   ├── StatsCards.jsx
│   ├── TaskCard.jsx
│   ├── TaskForm.jsx
│   └── TaskList.jsx
│
├── data/
│   └── tasks.json
│
├── lib/
│   └── taskService.js
│
├── public/
│
└── README.md
```

---

## API Documentation

### Get All Tasks

**GET**

```http
/api/tasks
```

Response:

```json
[
  {
    "id": "123",
    "title": "Build Task Manager",
    "description": "Complete assessment",
    "dueDate": "2026-06-15",
    "completed": false,
    "createdAt": "2026-06-08T10:00:00.000Z"
  }
]
```

---

### Create Task

**POST**

```http
/api/tasks
```

Request Body:

```json
{
  "title": "Build Task Manager",
  "description": "Complete assessment",
  "dueDate": "2026-06-15"
}
```

Response:

```json
{
  "id": "123",
  "title": "Build Task Manager",
  "description": "Complete assessment",
  "dueDate": "2026-06-15",
  "completed": false,
  "createdAt": "2026-06-08T10:00:00.000Z"
}
```

---

### Update Task

**PUT**

```http
/api/tasks/:id
```

Request Body:

```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```

---

### Delete Task

**DELETE**

```http
/api/tasks/:id
```

Response:

```json
{
  "success": true
}
```

---

## Data Persistence

Tasks are stored inside:

```txt
/data/tasks.json
```

The backend reads and writes to this file using Node.js `fs/promises`, allowing task data to persist between server restarts without requiring a database.

---

## Design Decisions

* Used Next.js App Router for both frontend and backend to keep the application simple and maintainable.
* Chose JSON file storage because the assessment explicitly allowed in-memory arrays, JSON files, or SQLite.
* Implemented reusable React components for better maintainability.
* Used Tailwind CSS for rapid UI development and responsive design.
* Kept business logic separated in `taskService.js` to improve code organization.

---

## Future Improvements

Given more time, I would add:

* Drag and Drop task reordering
* Toast notifications
* Dark mode
* Unit and integration tests
* Pagination for large task lists
* Task categories and priorities
* Due date reminders
* User authentication
* Database integration (MongoDB/PostgreSQL)
* Optimistic UI updates

---

## Author

Purva Sharma

Full Stack Developer

Built as part of the Studio Graphene Full Stack Developer Assessment.
