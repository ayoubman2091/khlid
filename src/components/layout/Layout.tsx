import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomBar } from './MobileBottomBar'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  )
}
