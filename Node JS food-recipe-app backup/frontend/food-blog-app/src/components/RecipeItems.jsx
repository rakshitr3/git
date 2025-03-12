import { useLoaderData } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

export default function RecipeItems() {
  const allRecipes = useLoaderData()            //if we wont use loader function here then we need to pass get all recipes function as prop from parent or app.jsx to home.jsx then here

  console.log(allRecipes)
  return(
    <>
    <div className="card-container">
      {
        allRecipes?.map((item,index)=> {
          return (
            <div key={index} className="card">
                 <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px" alt={item.title} />         {/* src={foodImg} for same image hardcoded As we made public folder static so we just use image here not public folder*/}
                 <div className="card-body">
                  <div className="title">{item.title}</div>
                  <div className="icons">
                      <div className="timer"><BsStopwatchFill/>{item.time}</div>
                      <FaHeart />
                  </div>
                 </div>
              </div>
          )
        })
      }
    </div>
    </>
  )
}