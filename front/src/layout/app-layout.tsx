import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <div>app layout</div>

      <Outlet />
    </div>
  )
}
