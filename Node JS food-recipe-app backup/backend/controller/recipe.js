const Recipes= require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({                //use multer and copy this snippet from disc Storage
    destination: function (req, file, cb) {
      cb(null, './public/images')                  //this callback is giving the file destination
    },
    filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename)                                              //cb is callback function here giving the filename
    }
  })
  
  const upload = multer({ storage: storage })                   //passing our storage in multer and store it in variable upload

const getRecipes=async (req,res)=>{
    const recipes= await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async (req,res)=>{
     const {id}= req.params;
     const recipe= await Recipes.findById(id)             //or directly use req.params.id
     res.json(recipe)
}

const addRecipe=async  (req,res)=>{
    //console.log(req.file)
    console.log(req.user)                                      //req.user now contain the values we got from token(email,id line 23 user.js controller) that we set in auth.js line 14
    const {title,ingredients,instructions,time}=req.body;

    if(!title || !ingredients || !instructions)
    {
        return res.json({message:"Required fields can't be empty"})
    }

    const newRecipe= await Recipes.create({
title,ingredients,instructions,time,coverImage:req.file.filename,        //giving filename to 
createdBy:req.user.id
    })

    return res.json(newRecipe)
}

const editRecipe=async (req,res)=>{
    const {title,ingredients,instructions,time}=req.body;
    let recipe =await Recipes.findById(req.params.id)              //first we will find the data to update the update it

    try{
    if(recipe){
        await Recipes.findByIdAndUpdate(
            req.params.id,
            req.body,                        //or give object attach with it in line 30
            {new:true}
        )
    res.json({title,ingredients,instructions,time})
    }
}
catch(err){
    return res.status(404).json({message:"error"})
}
}

const deleteRecipe=async (req,res)=>{
   const {id}= req.params
    try{
    let recipe =await Recipes.findByIdAndDelete(id)  
    res.json("Recipe Deleted")
    }

catch(err){
    return res.status(404).json({message:"error"})
}
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}