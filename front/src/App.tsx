import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/app/home'
import { AppLayout } from './layout/app-layout'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import PrivateRoute from './components/PrivateRoute'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  )
}
