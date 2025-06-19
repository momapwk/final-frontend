import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from './ui/button'
import { UserCircle } from 'lucide-react'

const Header = () => {
  const { user, logout, fetchCurrentUser } = useAuthStore()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <header className="w-full bg-gradient-to-r from-pink-100 via-red-300 to-pink-500 p-6 rounded-lg shadow-md mt-6">
      {/* Top Row: Logout + User Info */}
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <UserCircle className="w-10 h-10 text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-md font-semibold text-gray-800">
              {user?.name || 'User'}
            </span>
            <span className="text-sm uppercase tracking-wide text-purple-600 font-medium">
              {user?.role || 'USER'}
            </span>
          </div>
        </div>

        {/* Logout */}
        <Button
          onClick={logout}
          variant="destructive"
          className="text-sm font-medium px-4 py-2"
        >
          Logout
        </Button>
      </div>

      {/* Center Message */}
      <section className="text-center mt-3 space-y-2 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 font-serif">
          Welcome to the Event Management Platform
        </h1>
      </section>
    </header>
  )
}

export default Header
