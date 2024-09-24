import React from 'react';
import Car from '../../assets/images/car.jpeg';
import Hotel from '../../assets/images/hotel.jpg';
import Suitcase from '../../assets/images/suitcase.jpg';
import { FaCar } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { FaSuitcase } from "react-icons/fa6";
//tasarımda görülen sağ taraftaki sidebar
function Sidebar() {
  return (
    <div className='hidden md:flex items-center flex-col space-y-4 w-1/5'>
      <div className='relative hover:scale-105 transition-transform duration-300 cursor-pointer'>
        <img src={Car} alt="Car Rentals" className='rounded-lg w-52 h-52 object-cover' />
        <p className='absolute inset-0 flex flex-col items-start justify-end text-white text-xl ml-3 font-bold'>
          <FaCar />
          CAR RENTALS
        </p>
      </div>
      <div className='relative hover:scale-105 transition-transform duration-300 cursor-pointer'>
        <img src={Hotel} alt="Hotels" className='rounded-lg w-52 h-52 object-cover' />
        <p className='absolute inset-0 flex flex-col items-start justify-end ml-3 text-white text-xl font-bold'>
          <LiaHotelSolid />
          HOTELS
        </p>
      </div>
      <div className='relative hover:scale-105 transition-transform duration-300 cursor-pointer'>
        <img src={Suitcase} alt="Travel Packages" className='rounded-lg w-52 h-52 object-cover' />
        <p className='absolute inset-0 flex flex-col items-start justify-end ml-3 text-white text-xl font-bold'>
          <FaSuitcase />
          TRAVEL PACKAGES
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
