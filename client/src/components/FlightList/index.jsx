import React, { useEffect, useState } from 'react';
import FlightCard from '../FlightCard';
import { useFlights } from '../../context/FlightContext';
import { serverApi } from '../../config/axios';
import { Skeleton } from 'antd';

export default function FlightList() {
  const { flights, updateFlights } = useFlights();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    getFlightData();
  }, []);

  const getFlightData = async () => {
    try {
      // API'den veri alıyoruz
      const results = await serverApi.get('/getFlights');
      updateFlights(results.data.data.flights);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setLoading(false); 
    }
  };

  return (
    <div className='w-3/4 flex flex-col gap-y-10 mt-10'>
      {loading ? (
        // Eğer veri yükleniyorsa skeleton gösteriyoruz
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        // Veriler yüklendiğinde FlightCard bileşenlerini gösteriyoruz
        flights.map((flight, index) => (
          <FlightCard
            key={index}
            deptTime={flight.scheduleTime}
            arrTime={flight.estimatedLandingTime}
            routes={flight.route}
            flightNumber={flight.flightNumber}
            flightCode={flight.flightName}
            flightDate={flight.scheduleDate}
          />
        ))
      )}
    </div>
  );
}
