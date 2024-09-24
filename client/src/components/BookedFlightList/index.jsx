import React, { useEffect, useState } from 'react';
import { serverApi } from '../../config/axios';
import { useFlights } from '../../context/FlightContext';
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { TbClockHour2Filled } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { Skeleton } from 'antd';

function BookedFlightList({ flights }) {
  const { setBookedFlights } = useFlights();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getBookedFlights();
  }, []);

  const getBookedFlights = async () => {
    try {
      const result = await serverApi.get('/getBookedFlights');
      setBookedFlights(result.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booked flights:', error);
      setLoading(false); 
    }
  };

  return (
    <div className='w-full flex flex-col mt-4'>
      {loading ? (
        // Veriler yüklenirken skeleton gösteriyoruz
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        // Veriler geldikten sonra bookedFlights verilerini gösteriyoruz
        flights.map((bookedFlight, index) => (
          <div
            className='bg-white rounded mx-2 sm:mx-6 md:mx-10 lg:mx-16 px-4 py-3 shadow-lg flex flex-col md:flex-row h-auto mb-4'
            key={index}
          >
            <div className='w-full md:w-1/3 flex flex-col'>
              <div className='w-full flex gap-x-2 sm:gap-x-4 items-center justify-between mb-3'>
                <div className='flex flex-col items-center'>
                  <h2 className='text-base sm:text-lg md:text-xl flex gap-x-1 text-textColor'>
                    <PiAirplaneInFlightFill className='text-blue-600' />
                    <p>{bookedFlight.flightName}</p>
                  </h2>
                  <p className='text-sm sm:text-base text-textColor text-opacity-80'>
                    ({bookedFlight.flightNumber})
                  </p>
                </div>

                <p className='text-sm sm:text-lg md:text-xl font-extrabold flex items-center gap-x-2'>
                  <span>
                    <TbClockHour2Filled className='text-blue-600' />
                  </span>
                  {bookedFlight.deptTime} - {bookedFlight.arrTime}
                </p>
              </div>
              <div className='w-full flex justify-end'>
                <div className='flex items-center justify-center gap-x-2'>
                  <MdDateRange className='text-blue-600' />
                  <p className='text-sm sm:text-base'>{bookedFlight.flightDate}</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-1/3 flex flex-col items-center justify-center mt-3 md:mt-0'>
              <p className='text-sm sm:text-base'>{bookedFlight.deptAirport} to {bookedFlight.arrAirport}</p>
              <p className='text-sm sm:text-base'>{bookedFlight.flightTime}</p>
              <p className='text-blue-600 text-sm sm:text-base'>Nonstop</p>
            </div>

            <div className='w-full md:w-1/3 flex justify-center items-center mt-3 md:mt-0'>
              <div className='rounded shadow-xl flex items-center gap-y-1 sm:gap-y-2 flex-col w-16 h-20 sm:w-20 sm:h-24 border-2 border-textColor'>
                <p className='font-extrabold text-sm sm:text-base'>{bookedFlight.price}$</p>
                <p className='text-textColor text-sm sm:text-base'>Main</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookedFlightList;
