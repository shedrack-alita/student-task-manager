import mongoose from 'mongoose'

// MongoDB connection string
const MONGODB_URI = 'mongodb://127.0.0.1:27017/taskmanager'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB Connected Successfully!')
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

export default connectDB