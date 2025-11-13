# Student Task Manager

A full-stack task management application built with React, Express.js, and MongoDB. Perfect for students to organize their task and stay on top of their work.

![Task Manager Screenshot](https://via.placeholder.com/800x400?text=Task+Manager+Dashboard)

## Features

- Create, read, update, and delete tasks
- Set task priorities (Low, Medium, High)
- Add detailed descriptions to tasks
- Track due dates with overdue warnings
- Mark tasks as complete/incomplete
- Beautiful, responsive dashboard design
- Real-time statistics and analytics
- Mobile-friendly interface

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Bun** - Package manager

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v5 or higher)
- [Bun](https://bun.sh/) (optional, but recommended)


## Project Structure
```
student-task-manager/
├── frontend/
│   └── stm-app/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Header.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── TaskForm.jsx
│       │   │   ├── TaskList.jsx
│       │   │   ├── TaskItem.jsx
│       │   │   ├── StatsCard.jsx
│       │   │   └── DashboardLayout.jsx
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       └── tailwind.config.js
│
└── task-backend/
    ├── config/
    │   └── database.js
    ├── models/
    │   └── Task.js
    ├── server.js
    └── package.json
```

## Configuration

### MongoDB Connection

The default MongoDB connection string is:
```
mongodb://127.0.0.1:27017/taskmanager
```

To change it, edit `task-backend/config/database.js`

### Port Configuration

- **Backend**: Port 3000 (change in `task-backend/server.js`)
- **Frontend**: Port 5173 (change in `vite.config.js`)

## API Endpoints

| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| DELETE | `/api/tasks/completed/all` | Delete all completed tasks |
| GET | `/api/stats` | Get task statistics |

## Features in Detail

### Task Management
- Create tasks with name, description, priority, and due date
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete individual tasks or bulk delete completed tasks

### Dashboard
- View all tasks at a glance
- See pending, completed, and overdue tasks
- Filter tasks by priority
- Responsive design for mobile and desktop

### Priority Levels
- **High** - Urgent tasks
- **Medium** - Normal priority
- **Low** - Can wait

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)


## Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by [Amplify DigiTech]