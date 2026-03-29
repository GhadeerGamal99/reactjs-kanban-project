import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Board from './pages/components/Board';
import SearchBar from './components/common/SearchBar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<SearchBar></SearchBar>
      <Board></Board>
      <Toaster />
    </>
  )
}

export default App
