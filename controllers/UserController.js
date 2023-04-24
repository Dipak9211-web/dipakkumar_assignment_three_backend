import User from '../modals/User.js'

export const createUser = async (req, res)=>{  
    try {
        const {name, email, phone, website} = req.body;
        //validation
        if(!name || !email || !phone || !website ){
            return res.json({error:'All field is required'})
        }
        //check email
        const emailMatched = await User.findOne({email});
        const phoneMatched = await User.findOne({phone});
        const websiteMatched = await User.findOne({website});
        if(emailMatched){
            return res.json({error:`this email is already taken by ${emailMatched.name}, please enter different email`})
        }
        if(phoneMatched){
            return res.json({error:`this number is already taken by ${phoneMatched.name}, please enter different phone no.`})
        }
        if(websiteMatched){
            return res.json({error:`this website is already taken by ${websiteMatched.name}, please enter different website url`})
        }

        const user = await new User({
            name,
            email,
            phone,
            website
        }).save();
       if(user){
        res.status(200).json(user)
       }

    } catch (error) {
        console.log(error.message, error);
        res.status(400).json({error:error.message})

    }
}
//get all users
export const getAllUsers = async (req, res)=>{
    try {
        const users = await User.find({});
        if(users){
           res.status(200).json(users)
        }else{
           res.status(401).json({error:"Server or Network issue"})
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
    
}
//update user
export const updateUser = async (req, res)=>{
    try {
        const user = req.params.userId;
        if(!user){
            return res.json({error:"please check the code, bad request"})
        }
        const oldUser = await User.findById({_id:user})
        let updateUser = {};
        //validate fields
        if(oldUser.email !== req.body.email){
            const emailMatched =await User.findOne({email:req.body.email}) ;
            if(emailMatched){
                return res.json({error:`cant't update because this email has already taken by ${emailMatched.name}`})
            }else{
                updateUser.email = req.body.email;
            }
        }else{
            updateUser.email = req.body.email
        }

        if(oldUser.phone!==req.body.phone){
            const phoneMatched = await User.findOne({phone:req.body.phone});
            if(phoneMatched){
                return res.json({error:`cant't update because this number has already taken by ${phoneMatched.name}`})
            }else{
                updateUser.phone = req.body.phone;
            }
        }else{
            updateUser.phone = req.body.phone
        }

        if(oldUser.website!==req.body.website){
            const websiteMatched= await User.findOne({website:req.body.website});
            if(websiteMatched){
                return res.json({error:`cant't update because this website name has already taken by ${websiteMatched.name}`})
            }else{
                updateUser.website = req.body.website;
            }
        }else{
            updateUser.website = req.body.website
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId, {
               name:req.body.name || oldUser.name,
               email:updateUser.email || oldUser.email,
               phone:updateUser.phone || oldUser.phone,
               website:updateUser.website || oldUser.website
            },{ new: true }
         );
         res.status(200).json(updatedUser)
      
    
    } catch (error) {
        res.status(501).json({error:error.message})
    }  
}

//delete User
export const removeUser = async (req, res)=>{
    try {
        const userId = req.params.userId;
        if(!userId){
           return res.json({error:"please check the code, userId is not found"})
        }
        const deletedUser = await User.findByIdAndRemove({_id:userId});
        if(deletedUser){
            return res.status(200).json({message:"User deleted"})
        }else{
            return res.status(401).json({error:"this user is not exist"})
        }
    } catch (error) {
        res.status(501).json({error:error.message})
    }
    
}




