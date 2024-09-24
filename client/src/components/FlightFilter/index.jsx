import React, { useState } from 'react';
import { FaPlane } from "react-icons/fa6";
import { DatePicker, Select } from 'antd';
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaPlaneArrival } from "react-icons/fa6";
import { serverApi } from '../../config/axios';
import { useFlights } from '../../context/FlightContext';

export default function Index() {
  const { updateFlights, flights } = useFlights();
  const { RangePicker } = DatePicker;
  const [flightDirection, setFlightDirection] = useState('');
  const [dates, setDates] = useState([]);

  const disabled3DaysDate = (current, { from, type }) => {
    if (from) {
      const minDate = from.add(-2, 'days');
      const maxDate = from.add(2, 'days');
      switch (type) {
        case 'year':
          return current.year() < minDate.year() || current.year() > maxDate.year();
        case 'month':
          return (
            getYearMonth(current) < getYearMonth(minDate) ||
            getYearMonth(current) > getYearMonth(maxDate)
          );
        default:
          return Math.abs(current.diff(from, 'days')) >= 3;
      }
    }
    return false;
  };

  const handleDateChange = (dates) => {
    setDates(dates);
  };

  const handleFilterFlights = async (e) => {
    e.preventDefault();
    const params = {};
    if (dates.length > 0) {
      params.fromScheduleDate = dates[0].format('YYYY-MM-DD');
      params.toScheduleDate = dates[1].format('YYYY-MM-DD');
    }
    if (flightDirection) {
      params.flightDirection = flightDirection;
    }
    const result = await serverApi.get('getFlights', {
      params
    });
    updateFlights(result.data.data.flights);
  };

  return (
    <div className='rounded-lg bg-white p-6 w-full'>
      {/* Başlık kısmı */}
      <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
        <div className='text-textColor flex gap-x-1 items-center'>
          <FaPlane className='text-xl' />
          <h2 className='font-bold text-lg'>BOOK YOUR FLIGHT</h2>
        </div>
        <div className='text-sm mt-4 md:mt-0'>
          round trip
        </div>
      </div>

      {/* Filtreleme inputlarının olduğu kısım */}
      <div className='flex flex-col md:flex-row items-center gap-4 w-full justify-between'>
        {/* Kalkış Havalimanı */}
        <div className='flex items-center gap-x-2 w-full md:w-1/4'>
          <FaPlaneDeparture className='text-appColor text-xl' />
          <Select className='w-full' placeholder="Select Departure Airport" />
        </div>

        {/* Varış Havalimanı */}
        <div className='flex items-center gap-x-2 w-full md:w-1/4'>
          <FaPlaneArrival className='text-appColor text-xl' />
          <Select className='w-full' placeholder="Select Arrive Airport" />
        </div>

        {/* Uçuş Yönü */}
        <div className='w-full md:w-1/4'>
          <Select onChange={(value) => { setFlightDirection(value); }} options={[{ value: 'A', label: 'A' }, { value: 'D', label: 'D' }]} className='w-full' placeholder='Select flight direction' />
        </div>

        {/* Tarih Aralığı Seçimi */}
        <div className='w-full md:w-1/4'>
          <RangePicker 
            disabledDate={disabled3DaysDate} 
            onChange={handleDateChange} 
            className='w-full' 
            style={{ width: '100%' }} 
          />
        </div>
      </div>

      {/* Buton kısmı */}
      <div className='mt-5 flex justify-center md:justify-start'>
        <button onClick={handleFilterFlights} className='bg-appColor text-white text-center p-2 rounded w-full md:w-auto'>
          Show Flights
        </button>
      </div>
    </div>
  );
}
