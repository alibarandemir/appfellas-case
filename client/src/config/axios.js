import axios from 'axios'


 export const serverApi = axios.create({
    baseURL:'http://localhost:5000',
    headers:{
        'Accept':'application/json',
    }
})