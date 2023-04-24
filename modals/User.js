import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      phone:{
        type:String,
        unique:true,
        required:true
      },
      website:{
        type:String,
        unique:true,
      }
},{ timestamps: true });

export default mongoose.model('User', useSchema);





