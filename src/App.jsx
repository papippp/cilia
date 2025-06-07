import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/AuthPage'
import ProfilePage from './Pages/ProfilePage'
import { PlayerProvider } from './Components/PlayerContext'
import Callback from './Pages/CallBack'


function App() {


  return (
    <>
      <BrowserRouter>
        <PlayerProvider>
          <Routes>


            <Route element={<AuthPage />} path='*' />
            <Route element={<Callback />} path='/callback' />
            <Route element={<AuthPage />} path='/login' />
            <Route element={<ProfilePage />} path='/profile' />

          </Routes>
        </PlayerProvider>
      </BrowserRouter>

    </>
  )
}

export default App
