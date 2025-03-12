const express= require("express");
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");
const verifyToken = require("../middleware/auth");
const router=express.Router();


router.get("/", getRecipes)            //for getting all Recipes
router.get("/:id",getRecipe)          //for getting individual recipe by id
router.post("/",upload.single('file'),verifyToken, addRecipe)             //upload.single is a part of multer and name here should mathc with name attribute of addfoodrecipe input tag, first verify the token then add recipe
router.put("/:id",editRecipe)           //for updating or edit recipe
router.delete("/:id",deleteRecipe)       //for deleting recipe

module.exports=router;