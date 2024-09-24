import axios from 'axios';
import 'dotenv/config';
import Flight from '../models/Flight.js'

export const getFlights = async (req, res) => {
    try {
        const { fromScheduleDate, toScheduleDate, flightDirection } = req.query;
        console.log(fromScheduleDate, toScheduleDate);

        const params = {
            includedelays: false,
            page: 0,
            sort: '+scheduleTime',
            ...(fromScheduleDate && { fromScheduleDate }), 
            ...(toScheduleDate && { toScheduleDate }), 
            ...(flightDirection && { flightDirection }) 
        };

        const results = await axios.get('https://api.schiphol.nl/public-flights/flights', {
            headers: {
                'Accept': 'application/json',
                'app_id': process.env.API_ID,
                'app_key': process.env.API_KEY,
                'ResourceVersion': 'v4'
            },
            params
        });
        

        console.log(results.data);
        res.status(200).json({
            message: 'Uçuş API’sinden gelen veriler gönderildi',
            data: results.data
        });
    } catch (e) {
        console.error('Hata:', e.message);

        // Detaylı hata çıktısı
        if (e.response) {
            console.error('Response data:', e.response.data);
            console.error('Response status:', e.response.status);
            console.error('Response headers:', e.response.headers);
        }

        res.status(500).json({
            message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            error: e.message
        });
    }
};

// Rezervasyon yapıp kullanıcıya mesaj gönderir
export const createReservation = async(req,res) => {
    // Rezervasyon yapma işlemleri
    try{
        const {
            flightName,
            flightNumber,
            flightDate,
            price,
            flightTime,
            deptTime,
            arrTime,
            deptAirport,
            arrAirport
          } = req.body;
         
        // Aynı uçuş numarası ve tarihe sahip bir rezervasyon var mı kontrol et
        const existingReservation = await Flight.findOne({
            flightNumber: flightNumber,
        });

        // Eğer aynı rezervasyon varsa, kullanıcıya mesaj döndür
        if (existingReservation) {
            return res.json({
                success: false,
                message: 'A reservation has already been made for this flight.'
            });
        }
          const reservation= new Flight({
            flightName,
            flightNumber,
            flightDate,
            price,
            flightTime,
            deptTime,
            arrTime,
            deptAirport,
            arrAirport
          })
          await reservation.save();
        return(
            res.status(200).json({success:true,message:'Reservation created successfully!',reservation:reservation})
        )
        
    }
    catch(e){
        console.error('Error creating reservation:', e);
        return res.status(500).json({
          message: 'An error occurred while creating the reservation.',
          error: e.message
        });
    }
}

// Rezervasyon yapılmış uçuş bilgilerini döndürür
export const getBookedFlight = async (req, res) => {
    try {
        // Veritabanından tüm uçuş rezervasyonlarını çek
        const bookedFlights = await Flight.find();  
        // Eğer rezervasyon bulunamadıysa, mesaj döndür
        if (bookedFlights.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rezervasyon bulunamadı.'
            });
        }
        // Rezervasyonları başarıyla döndür
        return res.status(200).json({
            success: true,
            message: 'Rezervasyon yapılmış uçuşlar başarıyla getirildi.',
            data: bookedFlights
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            success: false,
            message: 'Rezervasyon yapılmış uçuşlar alınırken bir hata oluştu.',
            error: e.message
        });
    }
};
