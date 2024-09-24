import { createContext, useContext, useState } from "react";


//proje case olduğu ve karmaşık olmadığı için state yönetimi olarak context api kullandım 
//fakat redux bilgim de var, redux da kullanılabilirdi

const FlightContext= createContext()
export const FlightProvider=({children})=>{
    const [flights,setFlights]= useState([])
    const [bookedFlights,setBookedFlights]= useState([])


    const updateFlights= (flightData)=>{
        setFlights(flightData)
    }
    return(
        <FlightContext.Provider value={{flights,updateFlights,bookedFlights,setBookedFlights}}>

            {children}
        </FlightContext.Provider>
    )
}

export const useFlights=()=>{
    return useContext(FlightContext)
    }