import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <nav className="bg-[#FBFBFB] flex justify-around h-12 items-center font-bold tracking-tight">
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
    </nav>
  )
}
