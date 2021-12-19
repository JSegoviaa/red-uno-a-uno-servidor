import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB || '');
    console.log('Base de datos en línea');
  } catch (error) {
    console.log(error);
    throw new Error('Error momento de conectarse con la base de datos');
  }
};
