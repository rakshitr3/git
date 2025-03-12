const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")

const userSignUp= async(req,res)=>{
const {email,password}=req.body
if(!email || !password)
{
    return res.status(400).json({message:"Email and Password is required"})      //we use return here so that if "if" statement follow then it return the message and function end there and after return code wont work
}
let user= await User.findOne({email})        //as we need to find only one matching result of email so use findOne
if(user){
    return res.status(400).json({error:"Email is already exist"})
}

//password hashing
const hashPwd=await bcrypt.hash(password,10)       //10 is the salt number or no of rounds  //password it got from line 6
const newUser= await User.create({
    email,password:hashPwd
})

//creating jwt token
let token= jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)     //new user created with an id and that id we attach with this token
return res.status(200).json({token,user:newUser})         //for making uniformity in key we attach same key user to both signUp and login ref inputForm line 16  //By sending the token right after the sign-up process, you're making the user experience smoother. The user doesn’t need to go through a separate login process to get the token.



}

const userLogin= async(req,res)=>{
    const {email,password} =req.body
    if(!email || !password)
    {
        return res.status(400).json({message:"Email and password is required"})
    }
         let user=await User.findOne({email})
         if(user && await bcrypt.compare(password,user.password)){
            let token=jwt.sign({email,id:user._id},process.env.SECRET_KEY,{expiresIn:"1hr"})
            return res.status(200).json({token,user:user})
         }
         else{
            return res.status(400).json({error:"Invalid Credentials"})
         }
}

const getUser= async(req,res)=>{
   const user=await User.findById(req.params.id)
   res.json({email:user.email}) 
}

module.exports= {userSignUp,userLogin,getUser}