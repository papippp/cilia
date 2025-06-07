import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/AuthPage'
import ProfilePage from './Pages/ProfilePage'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>


          <Route element={<AuthPage />} path='*' />
          <Route element={<AuthPage />} path='/login' />
          <Route element={<ProfilePage />} path='/profile' />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
