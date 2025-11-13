import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    minlength: [1, 'Task name cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

export default Task