import mongoose from 'mongoose'
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/connection.js';
import dotenv from 'dotenv'
import pinsRouter from './Routes/PinsRoutes.js';
import usersRouter from './Routes/UserRoutes.js';
import { errorHandler, errorNotFound } from './Middleware/errorMiddleware.js';
import path from 'path';

dotenv.config();

connectDB()

const app = express();


app.get('/',(req,res)=>{
    console.log('API is running!');
    res.send('OK')
})
const port= 5000 || process.env.PORT;

app.use(express.json())
app.use(morgan('dev'))

//pin routes
app.use('/api/pins',pinsRouter)
app.use('/api/users',usersRouter)

// @desc public GET api/pins
// app.get('/pins',(req,res)=>{
//     res.json(Pins)
// })

const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/pinterest-c/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'pinterest-c', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


// @desc public GET api/pins/:id
// app.get('/pins/:id',(req,res)=>{
//     const id = req.params.id;
//     console.log(id)
//     const pin = Pins.find(pin=> pin.id===id);
//     res.json(pin)
// })
app.use(errorNotFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log('Server running at: https://localhost:'+port);
})
