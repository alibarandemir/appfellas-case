import mongoose from "mongoose";


export const connectDb = async () => {
    try {
      await mongoose.connect('mongodb+srv://alibarandemir798:appfellascase@fligthtdb.ass7n.mongodb.net/fligthtdb?retryWrites=true&w=majority', {
      });
      console.log('Veritabanına başarıyla bağlanıldı');
    } catch (error) {
      console.error('Veritabanına bağlanılamadı:', error.message);
    }
  };