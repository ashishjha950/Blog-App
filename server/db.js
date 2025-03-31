import mongoose from "mongoose";

const connection=()=>{
    const databaseUrl = process.env.MONGO_URL;
    try{
        mongoose.connect(databaseUrl)
        console.log('database connected')
    }
    catch(err){
        console.log('error occured in database connection',err)
    }
}

export default connection