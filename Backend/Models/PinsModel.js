import mongoose from "mongoose";
const commentsSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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
const likesSchema = mongoose.Schema({
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

const pinSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    pin:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    board:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    likes:[likesSchema],
    comments:[commentsSchema],
    link:{
        type:String,
        required:true
    }
    },
    {
    timestamps: true,
    }
)

const Pin = mongoose.model('Pin',pinSchema);

export default Pin;
