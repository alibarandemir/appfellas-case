import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import BookedFlightList from "../components/BookedFlightList";
import { Select } from "antd";
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFlights } from "../context/FlightContext";
import { useState, useEffect } from "react";

export default function BookedFlights() {
  const navigate = useNavigate();
  const { bookedFlights, setBookedFlights } = useFlights();
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(bookedFlights);
  const [sortedFlights, setSortedFlights] = useState(bookedFlights);
  useEffect(() => {
    setSortedFlights(bookedFlights);
    // Toplam fiyatı hesaplamak
    const total = bookedFlights.reduce(
      (acc, flight) => acc + Number(flight.price),
      0
    );
    setTotalPrice(total);
  }, [bookedFlights]);
  console.log(sortedFlights);
  const handleSort = (value) => {
    let sorted = [...bookedFlights];

    switch (value) {
      case "mostExpensive":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "cheapest":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "recentDate":
        sorted.sort((a, b) => {
          const aDateTime = new Date(`${a.flightDate} ${a.deptTime}`);
          const bDateTime = new Date(`${b.flightDate} ${b.deptTime}`);
          return bDateTime - aDateTime; // En son tarih ve saati dikkate al
        });
        break;
      default:
        sorted = [...bookedFlights];
    }
    setSortedFlights(sorted);
  };
  return (
    <div className="min-h-full w-full">
      {/* Filtreleme yerleri */}
      <div className="flex flex-col md:flex-row bg-white w-full h-auto md:h-16 px-4 items-center relative justify-between">
        {/* Geriye dönme tuşu */}
        <div className="flex items-center md:mr-4">
          <button
            onClick={() => navigate(-1)}
            className="gap-x-1 flex items-center justify-center"
          >
            <IoMdReturnLeft className="text-blue-600 text-xl" />
            <span className="font-bold">Return</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
          <button className="p-2 rounded border-textColor border-2">
            Times
          </button>
          <button className="p-2 rounded border-textColor border-2">
            Stops
          </button>
          <button className="p-2 rounded border-textColor border-2">
            Airlines
          </button>
          <button className="p-2 rounded border-textColor border-2">
            Airports
          </button>
          <button className="p-2 rounded border-textColor border-2">
            Amenities
          </button>
          <p className="text-blue-600">Edit search</p>
        </div>
      </div>
      <div className="flex justify-between mx-20 mt-5">
        <div className="flex items-center gap-x-1">
          Sort By:
          <Select
            onChange={handleSort}
            defaultValue="recommended"
            options={[
              { value: "recommended", label: "Recommended" },
              {
                value: "mostExpensive",
                label: "from Most expensive to the Cheapest",
              },
              {
                value: "cheapest",
                label: "from Most Cheapest to the Expensive",
              },
              { value: "recentDate", label: "the Most recent Date" },
            ]}
          />
        </div>
        <div className="flex items-center gap-x-1">
          <FaCircleInfo className="text-blue-500" />
          <p className="gap-x-2">
            Avg Fare:<span className="font-bold">${totalPrice}</span>
          </p>
        </div>
      </div>
      <BookedFlightList flights={sortedFlights} />
    </div>
  );
}
