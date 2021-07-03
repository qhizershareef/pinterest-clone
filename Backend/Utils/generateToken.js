import jwt from 'jsonwebtoken';

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JSON_SECRET,{
        expiresIn:'10d'
    })
} 
export default generateToken;