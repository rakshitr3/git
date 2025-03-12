const jwt=require("jsonwebtoken")

const verifyToken=async(req,res,next)=>{                    //next is for calling next middleware
    let token=req.headers["authorization"]                  //as we have set token into headers after getting from localStorage ref AddFoodRecipe.js

    if(token){
        token=token.split(" ")[1]                                   //at 0th index we have set bearer so use index 1
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({message:"Invalid token"})           //if token is there but wont verift then show this error
            }
            else{
                console.log(decoded)                                   // The decoded object typically contains the information that was stored in the JWT when it was created, such as the user’s ID, role, email, etc.
                req.user=decoded                                        //By attaching decoded to req.user, it makes the user's information available to subsequent middleware or route handlers without needing to manually pass the data.
            }
        })
        next()
    }
    else{                                                                    //if token wont exist then show this message
        return res.status(400).json({message:"Invalid token"})
    }
}
module.exports=verifyToken