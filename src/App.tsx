
import './App.css'
import { Toaster } from 'react-hot-toast';
import KanbanBoard from './pages/KanbanBoard';

function App() {
  return (
    <>
      <KanbanBoard></KanbanBoard>
      <Toaster />
    </>
  )
}

export default App
