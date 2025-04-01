import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: Array,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    writtenBy:{
        type: String,
    }
    },{
    timestamps: true,
})

const blogModels = mongoose.model("blog",blogSchema)

export default blogModels