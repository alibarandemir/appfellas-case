import express from 'express'
import { createReservation, getBookedFlight, getFlights } from '../controller/FlightController.js'

const router= express.Router()


router.get('/getFlights',getFlights)
router.post('/createReservation',createReservation)

router.get('/getBookedFlights',getBookedFlight)


export default router