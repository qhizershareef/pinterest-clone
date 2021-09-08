import asyncHandler from 'express-async-handler';
import Pin from '../Models/PinsModel.js'
import User from '../Models/UserModel.js';

// import asyncHandler from 'express-async-handler'
const getPins = asyncHandler( async (req, res) =>{
        const pins = await Pin.find({})
        if(pins){
            res.json(pins);
        }else{
            console.log(error);
            res.status(404)
            throw new Error('Product not found')
        }
    }
)
// @desc public GET api/pins/:id
const getPinById = asyncHandler( async(req,res)=>{
        const pin = await Pin.findById(req.params.id).populate('user','name profile followers');
        if(pin){
            res.json(pin);
        }else{
            console.log(error);
            res.status(404)
            throw new Error('Product not found')
        }
    }
)

const handlePinLike = asyncHandler(async(req,res)=>{
    const pin = await Pin.findById(req.params.id);
    console.log('under handle Pin controller')
    if(pin){
        const likeExists = pin.likes.some(el=>String(el.user)==req.user._id)
        console.log(likeExists+' exists')
        if(pin && !likeExists){
            const like = {
                user: req.user._id
            }
            pin.likes.push(like);
        }else{
            pin.likes = pin.likes.filter(function(value){ 
                return String(value.user)!=req.user._id
            });
        }
        const updatedPin = await pin.save();
        res.json(updatedPin)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const createBoard = asyncHandler(async (req,res) => {
    // console.log(req.body.name)
    const user = await User.findById(req.user._id);

    const {collectionName} = req.body;

    const BoardExists = user.collections.some(el=>String(el.collectionName)==collectionName)

    if(user && !BoardExists){
        user.collections.push({collectionName: collectionName});
        const updatedUser = await user.save();
        res.json(updatedUser)
    } else {
        res.status(400)
        throw new Error('Invalid user or Board already exists')
    }
})

const image_Upload = asyncHandler(async (req,res) => {
    try {
        const pin = req.body;
        if(pin){
            const pindata = await Pin.create(pin)
        }
    } catch (error) {
        
    }
})



const updatePin = asyncHandler(async (req,res) => {
    const userId = req.user._id;
    const pin = await Pin.findById(req.params.id).populate('user','name');
    console.log(userId);
    console.log(pin.user._id);
    if(pin && String(userId) == pin.user._id) {
        pin.pin = req.body.pin || pin.pin;
        pin.title = req.body.title || pin.title;
        pin.board = req.body.board || pin.board;
        pin.description = req.body.description || pin.description;
        pin.link = req.body.link || pin.link;

        const updatedPin = await pin.save();

        res.json(updatedPin)
    }else{
        res.status(404)
        throw new Error('You cannot update this pin, not authorized!')
    }
})
//upload pin controller, you need to wait until the link is being fetched from firebase
//if linkExists? go for the mongodb upload

const createPin = asyncHandler(async(req,res)=>{
    try {
        const {pin, title, board, description, link,} = req.body;
        const createPin = new Pin({
            user: req.user._id,
            pin, title, board, description, link,
        })

        const createdPin = await createPin.save();
        res.status(201).json(createdPin)

    } catch (error) {
        res.status(404)
        throw new Error('You cannot update this pin, not authorized!');
    }
})

export { getPins, getPinById, handlePinLike, createBoard, updatePin, createPin};