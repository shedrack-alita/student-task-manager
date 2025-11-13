function TaskItem({ task, onToggleComplete, onDelete }) {
    const priorityColors = {
      low: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      high: 'bg-red-100 text-red-700 border-red-200',
    }
  
    const priorityIcons = {
      low: '🟢',
      medium: '🟡',
      high: '🔴',
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
  
      if (date.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow'
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }
    }
  
    const isOverdue = new Date(task.dueDate) < new Date() && !task.completed
  
    return (
      <div className={`
        bg-white rounded-lg border-2 p-4 hover:shadow-md transition-all
        ${task.completed ? 'border-gray-200 opacity-60' : 'border-gray-200'}
        ${isOverdue ? 'border-l-4 border-l-red-500' : ''}
      `}>
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task._id)}
            className="shrink-0 mt-1"
          >
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center transition-all
              ${task.completed 
                ? 'bg-blue-600 border-blue-600' 
                : 'border-gray-300 hover:border-blue-500'
              }
            `}>
              {task.completed && (
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
  
          {/* Task content */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold text-gray-800 mb-1 text-lg
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}>
              {task.task}
            </h3>
  
            {/* Description if exists */}
            {task.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}
  
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {/* Priority badge */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[task.priority]}`}>
                <span>{priorityIcons[task.priority]}</span>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
  
              {/* Due date */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${isOverdue ? 'bg-red-100 text-red-700 font-semibold' : 'bg-gray-100 text-gray-700'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(task.dueDate)}
                {isOverdue && ' - Overdue!'}
              </span>
            </div>
          </div>
  
          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onToggleComplete(task._id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
  
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default TaskItem