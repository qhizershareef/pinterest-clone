import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const followersSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const followingSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const saveSchema = mongoose.Schema({
  pin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Pin',
  },
  collectionName:{
    type:String,
    required:true,
    unique: true
  }
},
{
  timestamps: true,
}
)
const LikedPinsSchema = mongoose.Schema({
  pin:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Pin',
  }
},
{
  timestamps: true,
})

const collectionSchema = mongoose.Schema({
  collectionName:{
    type:String,
    required:true,
    unique: true
  }
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    description:{
      type:String,
      required:false,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    profile:{
        type:String,
        required:false
    },
    followers:[followersSchema],
    following:[followingSchema],
    saved:[saveSchema],
    pins:[LikedPinsSchema],
    password:{
        type:String,
        required:true
    },
    collections:[collectionSchema],
    },
    {
      timestamps: true,
    }
)

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
