import mongoose, { mongo } from 'mongoose'

//databasedeki işlemler için bir ODM aracı olarak mongoose kullandım

const FlightSchema= mongoose.Schema({
    //mongoose tabloya otomatik id propertysi ekliyor
    flightName:{
        type:String,
        unique:true,
        required:true    
    }
    ,
    flightNumber:{
        type:String,
        required:true
    },
    flightDate:String,
    price:String,
    flightTime:String,
    deptTime:String,
    arrTime:String,
    deptAirport:{
        type:String,
        required:false
    },
    arrAirport:{
        type:String,
        required:false

    },
})


 const Flight= mongoose.model('Flight',FlightSchema)
 export default Flight