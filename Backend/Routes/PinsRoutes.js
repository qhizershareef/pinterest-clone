import express from 'express';
import { protect } from '../Middleware/auth.js';
import { createBoard, createPin, getPinById, getPins, handlePinLike, updatePin } from '../Controllers/PinsController.js';
const Router = express.Router();
//the slight catch between route and get or other methods is you can append as many methods to route
//but in the other case you can only use one method per route

Router.route('/').get(getPins)
Router.get('/:id',getPinById)
Router.put('/:id/like', protect, handlePinLike)
Router.post('/create-Board', protect, createBoard)
Router.put('/edit/:id',protect, updatePin);
Router.post('/',protect, createPin);

export default Router;