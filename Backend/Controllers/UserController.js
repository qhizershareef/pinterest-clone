import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import generateToken from '../Utils/generateToken.js';
import bcrypt from 'bcryptjs';

const registerUser = asyncHandler(async (req,res) => {
    // console.log(req.body.name)
    console.log(req.body)
    const {name, email, password} = req.body;
    const userNameExists = await User.findOne({name});
    const emailNameExists = await User.findOne({email});

    if(userNameExists){
        res.status(400);
        throw new Error('The username already exists, please try another name!');
    }
    if(emailNameExists){
        res.status(400);
        throw new Error('This user already exists!');
    }
    if(password.length<6){
        res.status(400);
        throw new Error('Your password should be atleast 6 letters!');
    }
    const user = await User.create({name,email,password});
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            followers:user.followers,
            following:user.following,
            token:generateToken(user._id),
            collections: user.collections || []
        })
        console.log(user.password+'password');
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const authenticateUser = asyncHandler(async(req,res)=>{
        const {name,password} = req.body;
        console.log(password)
        if(!name.trim() || !password.trim()){
            res.status(401);
            throw new Error("One or more fields are incomplete!");
        }
        const user = await User.findOne({name});
        if(!user){
            res.status(401);
            throw new Error('Invalid username!');
        }
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email:user.email,
                profile:user.profile,
                followers:user.followers,
                following:user.following,
                collections:user.collections || [],
                // saved: user.saved || [],
                token: generateToken(user._id)
            })
        }else{
            res.status(401);
            throw new Error('Invalid Password');
        }
})



const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.profile){
            user.profile = req.body.profile;
        }
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            user.password = password;
        }
        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            profile: updatedUser.profile || '',
            token:generateToken(updatedUser._id)
        })
    }
})

const handleUserFollow = asyncHandler(async(req,res)=>{
    //case assume, user1 is following user2, and user1 is loggedin with req.user
    const user2Id = req.body.id;
    const user1 = await User.findById(req.user._id);
    const user2 = await User.findById(user2Id);
    if(user1._id===user2._id){
        res.status(401);
        throw new Error('Cannot Follow self!');
    }
    console.log('under handle user controller')
    if(user1 && user2){
        const followingExists = user1.following.some(el=>String(el.user)==user2Id);
        const followerExists = user2.followers.some(el=> String(el.user)==req.user._id);

        // console.log(followExists+' exists')
        if(!followerExists && !followingExists){
            const follower = {
                user: req.user._id
            }
            const following = {
                user: user2Id
            }
            user1.following.push(following);
            user2.followers.push(follower);

        }else{
            user2.followers = user2.followers.filter(f=>{
                return String(f.user)!=req.user._id
            })

            user1.following = user1.following.filter(f=>{
                return String(f.user)!=user2Id
            })
        }
        const updatedUser1 = await user1.save();
        const updatedUser2 = await user2.save();
        res.json({updatedUser1,updatedUser2})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
//public route to view profile, and to see followers/following
const getUserDetails = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password -email')
    res.json(user);
});

const savePin = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id);
    const pin = req.params.id;
    const collectionName = req.body.collectionName;
    if(user){
        user.saved.push({pin,collectionName});
    }
    await user.save();
    res.json({pin,collectionName});
    //use try catch next time
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id).populate('saved.pin').select('-password -email');
    res.json(user);
})
const getUserCollections = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);
    res.json(user.collections);
});

const getSavedPins = asyncHandler(async(req,res)=>{
    console.log('inside getsaved pins');
    console.log(req.params);
    const user = await User.findById(req.user.id).populate('saved.pin')
    const savedCollectionPins = user.saved.filter((saved)=> String(saved.collectionName) == req.params.cname);

    if(savedCollectionPins.length){
        res.json(savedCollectionPins);
    }else{
        res.status(404)
        throw new Error('No Saved Pins Found!')
    }
})

const deleteSavedPin = asyncHandler(async(req,res)=>{
    console.log('inside getsaved pins');
    console.log(req.params);
    const savedPinToDelete= req.params.id;
    const user = await User.findById(req.user.id)  
    user.saved.splice(user.saved.findIndex(saved=> saved._id == savedPinToDelete),1);
    await user.save();
    res.json('success');
    // }else{
    //     res.status(404)
    //     throw new Error('No Saved Pins Found!')
    // }
})


// const getUsers = asyncHandler(async (req,res) => {
//     const users = await User.find({}).select('-password');
//     if(users){
//         res.json(users)
//     } else {
//         res.status(400)
//         throw new Error('No users')
//     }

// })

export {registerUser, authenticateUser, updateUser, handleUserFollow, getUserDetails,getUserProfile
    ,getUserCollections, savePin, getSavedPins, deleteSavedPin
};