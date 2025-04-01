import blogModels from "../models/blog.js";

const getMyPosts = (req,res)=>{
    res.status(200).json({msg:true})    
}

const uploadPost = async(req,res)=>{
  try{
    if(!req.user){
      return res.status(401).json({msg:'You are not logged in',success:false})
    }
    const {title,content} = req.body;
    const imageUrl = req.file.path;
    const author = req.user._id;
    await blogModels.create({title,content,imageUrl,author})
    
    res.status(200).json({msg:'Blog added to profile',success:true,title,content,imageUrl})
  }catch(err){
    res.status(500).json({msg:'Server Error',success:false})
  }
}

export {getMyPosts,uploadPost}