import { NavLink } from 'react-router-dom'
import { LogOutIcon } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { logout } = useAuth()

  return (
    <nav className="bg-[#FBFBFB] relative flex justify-around h-12 items-center font-bold tracking-tight">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? 'text-[#25C1D1]' : 'text-[#222222]'} hover:scale-105`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/new-document"
        className={({ isActive }) =>
          `font-medium ${isActive ? 'text-[#25C1D1]' : 'text-[#222222]'} hover:scale-105`
        }
      >
        New document
      </NavLink>

      <button
        onClick={() => logout()}
        className="absolute right-4 cursor-pointer"
      >
        <LogOutIcon />
      </button>
    </nav>
  )
}
