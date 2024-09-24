import React from 'react';
import { FaPlane, FaUser } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { Avatar } from 'antd';
import { BsFillTicketFill } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  return (
    <div className='flex justify-between items-center h-20 px-4 md:px-10 bg-gray-100 w-full top-0'>
      {/* Sol Taraf */}
      <div className='flex items-center space-x-2 md:space-x-4'>
        <div className='rounded-3xl w-8 h-8 md:w-10 md:h-10 bg-appColor flex items-center justify-start'>
          <FaPlane className='text-white text-xl md:text-2xl' />
        </div>
        <h2 className='text-lg md:text-xl font-bold text-gray-700'>PLANE SCAPE</h2>
      </div>

      {/* Sağ Taraf */}
      <div className='flex items-center space-x-4 md:space-x-8'>
        <div onClick={() => { navigate('/bookedflights') }} className='flex cursor-pointer items-center transition gap-x-1 text-xs md:text-sm'>
          <FaPaperPlane className='text-appColor text-xl md:text-2xl' />
          <p className='font-bold'>My flights</p>
        </div>
        
        <div className='flex cursor-pointer items-center transition gap-x-1 text-xs md:text-sm'>
          <BsFillTicketFill className='text-appColor text-xl md:text-2xl' />
          <p className='text-gray-700'>Deals</p>
        </div>
        
        <div className='flex cursor-pointer items-center gap-x-1 text-xs md:text-sm'>
          <BiWorld className='text-appColor text-xl md:text-2xl' />
          <p className='text-gray-700'>Discover</p>
        </div>

        <div className='flex cursor-pointer items-center gap-x-1 duration-300'>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 48, xl: 48, xxl: 60 }}
            icon={<FaUser />}
          />
          <p className='text-xs md:text-sm text-gray-700'>John Smith</p>
        </div>
      </div>
    </div>
  );
}
