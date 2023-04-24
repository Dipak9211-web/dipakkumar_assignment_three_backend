import mongoose from "mongoose";

export const DB = ()=>{
    mongoose.connect(`${process.env.URI}`)
    .then(()=>console.log("Database connected"))
    .catch((error)=>console.log(`connection problem due to ${error}`))
}