import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    writtenBy:{
        type: String,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
    comments: [
        {
            text: String,
            author: String,
        }
    ],
    },{
    timestamps: true,
})

const blogModels = mongoose.model("blog",blogSchema)

export default blogModels