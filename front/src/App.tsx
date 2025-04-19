import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import PrivateRoute from './components/PrivateRoute'
import { NewDocument } from './pages/app/documents/NewDocument'
import { Home } from './pages/app/Home'

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
        <Route
          path="new-document"
          element={
            <PrivateRoute>
              <NewDocument />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  )
}
