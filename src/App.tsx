import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Board from './pages/components/Board';
import NavBar from './components/common/NavBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<NavBar></NavBar>
      <Board></Board>
      <Toaster />
    </>
  )
}

export default App
