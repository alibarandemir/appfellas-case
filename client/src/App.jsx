import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import BookedFlights from './pages/BookedFlights'
import NoMatch from './pages/NoMatch'
import {Toaster} from 'react-hot-toast'
import { FlightProvider } from './context/FlightContext';

function App() {
  return (
  <FlightProvider>
    <div className='App'>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/bookedflights' element={<BookedFlights/>}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
    </FlightProvider>
  )
}
export default App
