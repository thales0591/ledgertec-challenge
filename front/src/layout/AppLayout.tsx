import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="bg-[#EFEFEF] min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
