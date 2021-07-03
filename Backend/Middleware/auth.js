import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req,res,next)=>{
    try {
        let token;
        let authVal = req.headers.authorization;
        if(authVal && authVal.startsWith('Bearer')){
            try {
                token = authVal.split(' ')[1];
                const decoded = jwt.verify(token,process.env.JSON_SECRET)
                req.user = await User.findById(decoded.id).select('-password');
                next();
            } catch (error) {
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }
        if (!token) {
            res.status(401)
            console.log('no token')
            throw new Error('Not authorized, no token')
        }
    } catch (error) {
        res.json(error.message)
    }
});

export {protect};