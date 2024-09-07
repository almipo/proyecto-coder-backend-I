import {connect} from 'mongoose';

export const connectDB = async () => {
    try {
     await connect('mongodb+srv://alan:Ampk87@cluster1.f2ayt.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=Cluster1');
     //await connect('mongodb://127.0.0.1:27017/entregafinal')
      console.log('Base de datos conectada');
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  };