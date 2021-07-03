import mongoose from 'mongoose';
import Pin from '../Models/PinsModel.js';
import User from '../Models/UserModel.js';

const connectDB = async()=>{
    try{
        console.log('connecting')
        console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI, 
            {
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex:true
            }
        )
    console.log(`MongoDB connected : ${conn.connection.host}`);
    }catch(error){
        console.log(`Error ${error.message}`);
        process.exit(1)
    }
}


const connectFireDB = async()=>{
    
}
export default connectDB;