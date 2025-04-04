import blogModels from "../models/blog.js";

const postComment =async(req,res)=>{
    try{
        if(!req.user){
          return res.status(401).json({msg:'You are not logged in',success:false})
        }
        const {text} = req.body;
        let author = req.user.name;

        await blogModels.findByIdAndUpdate(req.params.postId,{$push:{comments:{text,author}}})
        
        res.status(200).json({msg:'Comment added to profile',success:true})
      }catch(err){
        res.status(500).json({msg:'Server Error',success:false})
      }
}

export {postComment}