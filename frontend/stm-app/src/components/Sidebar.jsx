import { useState } from 'react'

function Sidebar({ isOpen, onClose }) {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'tasks', label: 'All Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', badge: 12 },
    { id: 'today', label: 'Today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', badge: 3 },
    { id: 'upcoming', label: 'Upcoming', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', badge: 7 },
    { id: 'completed', label: 'Completed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  const priorities = [
    { id: 'high', label: 'High Priority', icon: '🔴', count: 3 },
    { id: 'medium', label: 'Medium Priority', icon: '🟡', count: 5 },
    { id: 'low', label: 'Low Priority', icon: '🟢', count: 4 },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static left-0 z-40
          w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ 
          top: '73px',
          height: 'calc(100vh - 73px)'
        }}
      >
        {/* Sidebar header - Mobile close button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content area */}
        <div 
          className="overflow-y-auto py-4"
          style={{ 
            height: 'calc(100% - 180px)',
            paddingBottom: '1rem'
          }}
        >
          {/* Main menu */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${activeMenu === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Priority filters section */}
          <div className="mt-8 px-3">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Filter by Priority
            </h3>
            <div className="space-y-1">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{priority.icon}</span>
                    <span className="text-sm font-medium">{priority.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{priority.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-8 px-3">
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">This Week</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tasks Created</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-blue-600">62%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 bg-white"
          style={{ height: '180px' }}
        >
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white h-full flex flex-col justify-between">
            <div>
              <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-blue-100 mb-3">Unlock all features and get unlimited tasks</p>
            </div>
            <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar