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
    res.status(200).json({myPosts,success:true})    
  }catch(err){
    res.status(500).json({msg:'Server Error',success:false})    
  }
}

const updateblog = async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({msg:'You are not logged in',success:false})
    }
    const {title,content} = req.body;
    let postId = req.params.postId;
    let oldBlogData = await blogModels.findById(postId)
    if (!oldBlogData) {
      return res.status(404).json({ msg: "Post not found", success: false });
    }

    let imageUrl = req.file ? req.file.path : oldBlogData.imageUrl;
    await blogModels.findByIdAndUpdate(postId,{title,content,imageUrl})
    
    res.status(200).json({msg:'Blog updated successfully',success:true,title,content,imageUrl})
  }catch(err){
    console.log(err)
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

const deletePost = async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({msg:'You are not logged in',success:false})
    }
    
    let post = await blogModels.findByIdAndDelete(req.params.postId)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found', success: false });
    }

    let user = await userModel.findOne({posts:post._id})
    user.posts.pull(post._id)
    await user.save()

    res.status(200).json({msg:'Successfully Deleted',success:true})
    
  } catch(err){
    res.status(500).json({msg:'Failed to delete post!',success:false})
  }
}


export {getMyPosts,uploadPost,getAllPosts,deletePost,updateblog}