import blogModels from "../models/blog.js";
import userModel from "../models/user.js";

const getAllPosts =async(req,res)=>{
  try {
    const myPosts = await blogModels.find({})
    res.status(200).json({myPosts})
  }catch(err){
    res.status(500).json({msg:'Server Error',success:false})    
  }
}

const getMyPosts = async(req,res)=>{
  
  try{
    if(!req.user){
      return res.status(401).json({msg:'You are not logged in',success:false})
    }
    let author = req.user._id;
    const myPosts = await blogModels.find({author})
    res.status(200).json({myPosts})    
  }catch(err){
    res.status(500).json({msg:'Server Error',success:false})    
  }
}

const uploadPost = async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({msg:'You are not logged in',success:false})
    }
    const {title,content} = req.body;
    let imageUrl = null
    if(req.file){
      imageUrl = req.file.path;
    }
    let author = req.user._id;
    let newPost = await blogModels.create({title,content,imageUrl,author,writtenBy:''})

    let user = await userModel.findOne({_id:author})
    user.posts.push(newPost._id)
    user.save()

    newPost.writtenBy = user.name;
    newPost.save()
    
    res.status(200).json({msg:'Blog added to profile',success:true,title,content,imageUrl})
  }catch(err){
    res.status(500).json({msg:'Server Error',success:false})
  }
}

export {getMyPosts,uploadPost,getAllPosts}