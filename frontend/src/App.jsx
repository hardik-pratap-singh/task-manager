import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import TaskPage from "./components/TaskPage"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  )
}

export default App
