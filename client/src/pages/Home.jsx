import React from 'react'
import Navbar from '../components/Navbar';
import FlightFilter from '../components/FlightFilter'
import Sidebar from '../components/Sidebar'
import FlightList from '../components/FlightList';
import { FlightProvider } from '../context/FlightContext';

export default function Home() {
  return (
  
    <div className='flex flex-col'>
        <Navbar/>
        <main className='flex w-full mt-5'>
          {/* Bu div uçuş filtrelemesi ve görüntülenmesi gibi componentleri kapsıyor*/}
          <div className='flex flex-col ml-8 w-4/5'>
            <FlightFilter/>
            <div className='flex'>
              <FlightList/>
            </div>
          </div>
          <Sidebar/>
        </main>
    </div>
 
  )
}
