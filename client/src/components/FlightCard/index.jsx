import React, { useEffect, useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaGripLines } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { serverApi } from "../../config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FlightCard({
  deptTime,
  arrTime,
  routes,
  flightNumber,
  flightCode,
  flightDate,
}) {
  //apide fiyat bilgisi sağlanmadığı için kendim random oluşturup
  //fiyat bilgilerini statede tutuyorum
  const navigate = useNavigate();
  const [price, setPrice] = useState();
  useEffect(() => {
    changePrice();
    console.log(routes);
  }, []);
  const changePrice = () => {
    const randomNumber = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
    setPrice(randomNumber);
  };
  const formatTime = (timeString) => {
    let date;
    // Eğer timeString 00:00:00 formatındaysa
    if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
      const today = new Date();
      const [hours, minutes] = timeString.split(":").map(Number);
      date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
      );
    }
    // Eğer timeString ISO 8601 formatındaysa
    else if (
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}$/.test(
        timeString
      )
    ) {
      date = new Date(timeString);
    } else {
      return "";
    }
    // AM/PM kontrolü
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    // 12 saat formatına dönüştür
    const formattedHours = hours % 12 || 12; // Saat 0 ise 12 olarak göster

    // Dakikayı iki haneli yap
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const convertTo24HourFormat = (timeString) => {
    let [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0; // Gece yarısı ise saat 0 olmalı
    }

    return `${hours}:${minutes}`;
  };
  const calculateFlightTime = (deptTime, arrTime) => {
    // deptTime veya arrTime boş ya da undefined ise hata kontrolü
    if (
      !deptTime ||
      !arrTime ||
      deptTime.trim() === "" ||
      arrTime.trim() === ""
    ) {
      return ""; // Boş ya da geçersiz zaman verisi varsa boş string döndür
    }
    console.log(deptTime, arrTime);
    // AM/PM formatını 24 saatlik formata çevir
    const deptTime24 = convertTo24HourFormat(formatTime(deptTime));
    const arrTime24 = convertTo24HourFormat(formatTime(arrTime));
    console.log(deptTime24, arrTime24);

    // Kalkış ve varış zamanlarını `Date` objesine dönüştür
    const today = new Date();
    const [deptHours, deptMinutes] = deptTime24.split(":").map(Number);
    const [arrHours, arrMinutes] = arrTime24.split(":").map(Number);
    const departureDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      deptHours,
      deptMinutes
    );
    const arrivalDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      arrHours,
      arrMinutes
    );
    if (arrivalDate < departureDate) {
      arrivalDate.setDate(arrivalDate.getDate() + 1);
    }
    // Zaman farkını milisaniye cinsinden hesapla
    const diffMs = arrivalDate - departureDate;
    //milisaniyeyi saat ve dakikaya ayırır
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    //setFlightTime(`${diffHours}h ${diffMinutes}m`)
    return `${diffHours}h ${diffMinutes}m`;
  };
  //Geçmiş tarihli uçuşlara rezervasyon yapılmaması için eklenen kontrol
  const isFlightDateValid = () => {
    // Bugünün tarihi
    const today = new Date();
    const flightDateObj = new Date(flightDate);

    // Sadece gün kontrolü yapıyoruz, saat ve dakika önemsenmiyor
    if (
      flightDateObj.getFullYear() !== today.getFullYear() ||
      flightDateObj.getMonth() !== today.getMonth() ||
      flightDateObj.getDate() !== today.getDate()
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleBookFlight = async () => {
    try {
      if (!isFlightDateValid()) {
        toast.error("You cannot book a flight for a past date.");
        return;
      }
      const result = await serverApi.post("createReservation", {
        flightName: flightCode,
        flightNumber: flightNumber,
        flightDate: flightDate,
        price: price,
        flightTime: calculateFlightTime(deptTime, arrTime),
        deptTime: formatTime(deptTime),
        arrTime: formatTime(arrTime),
        deptAirport: routes.departures?.join(", ") || "",
        arrAirport: routes.destinations?.join(", ") || "",
      });
      console.log(result.data);
      if (result.data.success) {
        toast.success(result.data.message);
        navigate("/bookedFlights");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while booking the flight.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg w-full text-textColor shadow-xl p-4 md:p-6">
    {/* Uçağın kalkacağı ve ineceği yeri gösteren başlık alanı */}
    <div className="w-full flex justify-center mb-3">
      <h2 className="text-textColor font-bold text-center md:text-left">
        Flight Code: {flightCode}
      </h2>
    </div>
    {/* Uçuş Bilgileri */}
    <div className="flex flex-col md:flex-row w-full items-center my-3">
      <div className="flex flex-col w-full md:w-1/5 items-center mb-4 md:mb-0">
        <div className="flex items-center gap-x-1">
          <FaPlaneDeparture />
          <p>Departure</p>
        </div>
        <div className="text-textColor font-bold text-lg">
          {formatTime(deptTime)}
        </div>
        <div>
          Airport:{" "}
          {routes && routes.departures && routes.departures.length > 0
            ? routes.departures.join(", ")
            : ""}
        </div>
      </div>
      <div className="hidden md:flex w-1/5 justify-center">
        <FaGripLines className="font-extrabold text-3xl" />
      </div>
      <div className="flex flex-col gap-y-2 items-center w-full md:w-1/5 mb-4 md:mb-0">
        <div>{flightNumber}</div>
        <div>
          <FaPlane className="text-appColor text-lg" />
        </div>
        <div>{calculateFlightTime(deptTime, arrTime)}</div>
      </div>
      <div className="hidden md:flex w-1/5 justify-center">
        <FaGripLines className="font-extrabold text-3xl" />
      </div>
      <div className="flex flex-col w-full md:w-1/5 items-center">
        <div className="flex items-center gap-x-1">
          <FaPlaneArrival />
          <p>Arrival</p>
        </div>
        <div className="text-textColor font-bold text-lg">
          {formatTime(arrTime)}
        </div>
        <div>
          Airport:{" "}
          {routes && routes.destinations && routes.destinations.length > 0
            ? routes.destinations.join(", ")
            : ""}
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between mt-4">
      <div className="flex flex-col items-center w-full md:w-1/5">
        <p className="text-appColor font-bold">Price: ${price}</p>
        <p>Round trip</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button
          onClick={handleBookFlight}
          className="rounded-tl-lg rounded-br-lg bg-appColor text-white text-center p-4"
        >
          Book Flight
        </button>
      </div>
    </div>
  </div>
  
  );
}
