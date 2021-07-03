import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './users.js';
import pins from './pins.js';
import connectDB from './config/connection.js';
import User from './Models/UserModel.js';
import Pin from './Models/PinsModel.js';
// Note: when running this script do not run directly run from within the folder, 
// run this file from outside or from main location that is the parent director of backend

dotenv.config();

connectDB()

const feedData = async () =>{
    try {
        await Pin.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users)
        const defaultUser = createdUsers[0];

        const samplePins = pins.map(pin=>{
            // console.log({ ...pin, user:defaultUser})
            return { ...pin, user:defaultUser}
        })
        await Pin.insertMany(samplePins);
        console.log('successfully uploaded!')
        process.exit()
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
feedData()