import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import Task from './models/Task.js'

const app = express()
const PORT = 3000

connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request Body:', JSON.stringify(req.body))
  }
  next()
})


// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 })
    console.log(`📋 Fetched ${tasks.length} tasks from database`)
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// GET a single task by ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    res.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    res.status(500).json({ error: 'Failed to fetch task' })
  }
})

// POST create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    console.log('Creating task with data:', req.body)
    
    const { task, description, priority, dueDate } = req.body
    
    // Validate required fields
    if (!task || !dueDate) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide task name and due date.' 
      })
    }
    
    const newTask = new Task({
      task,
      description: description || '',
      priority: priority || 'medium',
      dueDate
    })
    
    await newTask.save()
    
    console.log(`✅ Created task: ${newTask.task} (ID: ${newTask._id})`)
    res.status(201).json(newTask)
  } catch (error) {
    console.error('Error creating task:', error)
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// PUT update a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    console.log(`Updating task ${req.params.id}`)
    console.log('Update data:', req.body)
    
    const task = await Task.findById(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    // Check if req.body exists and has properties
    const hasBody = req.body && Object.keys(req.body).length > 0
    
    if (hasBody) {
      // Update fields if provided
      if (req.body.task !== undefined) {
        task.task = req.body.task
        console.log('Updated task name')
      }
      if (req.body.description !== undefined) {
        task.description = req.body.description
        console.log('Updated description')
      }
      if (req.body.priority !== undefined) {
        task.priority = req.body.priority
        console.log('Updated priority')
      }
      if (req.body.dueDate !== undefined) {
        task.dueDate = req.body.dueDate
        console.log('Updated due date')
      }
      if (req.body.completed !== undefined) {
        task.completed = req.body.completed
        console.log('Updated completed status')
      }
    } else {
      // If no body provided, toggle completion
      task.completed = !task.completed
      console.log('Toggled completion (no body provided)')
    }
    
    await task.save()
    
    console.log(`🔄 Updated task ${task._id}: completed = ${task.completed}`)
    res.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID' })
    }
    
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    console.log(`Deleting task ${req.params.id}`)
    
    const task = await Task.findByIdAndDelete(req.params.id)
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    
    console.log(`🗑️ Deleted task ${task._id}`)
    res.json({ message: 'Task deleted successfully', task })
  } catch (error) {
    console.error('Error deleting task:', error)
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID' })
    }
    
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

// DELETE all completed tasks
app.delete('/api/tasks/completed/all', async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true })
    console.log(`🗑️ Deleted ${result.deletedCount} completed tasks`)
    res.json({ 
      message: `Deleted ${result.deletedCount} completed tasks`,
      deletedCount: result.deletedCount 
    })
  } catch (error) {
    console.error('Error deleting completed tasks:', error)
    res.status(500).json({ error: 'Failed to delete completed tasks' })
  }
})

// GET task statistics
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Task.countDocuments()
    const completed = await Task.countDocuments({ completed: true })
    const pending = total - completed
    
    // Tasks by priority
    const byPriority = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: ['$completed', 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ])
    
    // Overdue tasks
    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      completed: false
    })
    
    res.json({
      total,
      completed,
      pending,
      overdue,
      byPriority
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
})

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})