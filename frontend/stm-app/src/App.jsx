import { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import StatsCard from './components/StatsCard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:3000/api/tasks';

function App() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			setLoading(true);
			setError('');
			const response = await fetch(API_URL);

			if (!response.ok) {
				throw new Error('Failed to fetch tasks');
			}

			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error('Error fetching tasks:', error);
			setError('Failed to load tasks. Make sure the backend is running.');
		} finally {
			setLoading(false);
		}
	};

	const addTask = async (taskData) => {
		try {
			setError('');
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) {
				throw new Error('Failed to create task');
			}

			const newTask = await response.json();
			setTasks([...tasks, newTask]);
		} catch (error) {
			console.error('Error adding task:', error);
			setError('Failed to add task');
			alert('Failed to add task');
		}
	};

	const toggleComplete = async (taskId) => {
		if (!taskId) return;

		try {
			setError('');
			const response = await fetch(`${API_URL}/${taskId}`, {
				method: 'PUT',
			});

			if (!response.ok) {
				throw new Error('Failed to update task');
			}

			const updatedTask = await response.json();
			setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
		} catch (error) {
			console.error('Error updating task:', error);
			setError('Failed to update task');
		}
	};

	const deleteTask = async (taskId) => {
		if (!taskId) return;

		if (!window.confirm('Are you sure you want to delete this task?')) {
			return;
		}

		try {
			setError('');
			const response = await fetch(`${API_URL}/${taskId}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete task');
			}

			setTasks(tasks.filter((task) => task._id !== taskId));
		} catch (error) {
			console.error('Error deleting task:', error);
			setError('Failed to delete task');
		}
	};

	// Calculate stats
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter((t) => t.completed).length;
	const pendingTasks = totalTasks - completedTasks;
	const overdueTasks = tasks.filter((t) => new Date(t.dueDate) < new Date() && !t.completed).length;

	return (
		<DashboardLayout>
			{/* Page header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
				<p className="text-gray-600">Welcome back! Here's what's happening with your tasks today.</p>
			</div>

			{/* Error message */}
			{error && (
				<div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{error}
				</div>
			)}

			{/* Stats cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatsCard
					title="Total Tasks"
					value={totalTasks}
					icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					color="blue"
					trend="up"
					trendValue="+3"
				/>
				<StatsCard title="Pending" value={pendingTasks} icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" color="yellow" />
				<StatsCard
					title="Completed"
					value={completedTasks}
					icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					color="green"
					trend="up"
					trendValue="+2"
				/>
				<StatsCard
					title="Overdue"
					value={overdueTasks}
					icon="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					color="red"
				/>
			</div>

			<div className="flex flex-col lg:flex-row gap-6">
				<div className="lg:w-1/2 shrink-0">
					<div className="lg:sticky lg:top-4" style={{ maxHeight: 'calc(100vh - 73px - 6rem)' }}>
						<div className="h-full overflow-y-auto">
							<TaskForm onAddTask={addTask} />
						</div>
					</div>
				</div>

				<div className="lg:w-1/2 min-w-0">
					<TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} loading={loading} />
				</div>
			</div>
		</DashboardLayout>
	);
}

export default App;
