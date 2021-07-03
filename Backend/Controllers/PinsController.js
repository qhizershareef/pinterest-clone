import asyncHandler from 'express-async-handler';
import Pin from '../Models/PinsModel.js'
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

const image_Upload = asyncHandler(async (req,res) => {
    try {
        const pin = req.body;
        if(pin){
            const pindata = await Pin.create(pin)
        }
    } catch (error) {
        
    }
})

//upload pin controller, you need to wait until the link is being fetched from firebase
//if linkExists? go for the mongodb upload



export { getPins, getPinById, handlePinLike };