import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog',
        }
    ],   
})

const userModel = mongoose.model('users',userSchema)

export default userModel