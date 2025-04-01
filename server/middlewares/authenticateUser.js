import jwt from "jsonwebtoken";

const authenticateUser = (req,res,next)=>{
    const token  = req.headers.authorization?.split(" ")[1];
    if(token==='null'){
        return res.status(401).json({msg:"You are not logged In",success:false});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next()
    }catch(err){
        return res.status(401).json({msg:"Invalid or Expired Token",success:false});
    }
}

export default authenticateUser