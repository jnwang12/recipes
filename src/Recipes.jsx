// import recipes from './data/recipes.json'
import {Header, Footer} from './components/Margins.jsx'
import './Recipes.css'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'

const Dish = ({name, description, image, id}) => {
  const direction = (id%2 ==0) ?"left" :"right"

  return(
    <div className={direction}>
      <div>
        <h1 style={{fontWeight : "bold"}}> {name}</h1>
        <h2 style = {{color: "#828700"}}> {description}</h2>
      </div>
      <img className= "dish" src={image} alt = {name}/>
    </div>
  )

}



const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, ifLoading] = useState(true)

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const {data, error } = await supabase.from('recipes').select('*')

        if (error) 
          throw error
        setRecipes(data)
      } catch (error) {
        console.log("error!", error.message)
      } finally {
        ifLoading(false)
      }
    }
    getRecipes()
  }, [])


  if (loading)
    return (
      <div className='page'> 
        <h1 style={{color: "#A43032"}}> gathering creations...</h1>
      </div>
    )

  console.log(recipes)

  return (
    
    <div className='page'>
      <Header/>
      <h1 className = 'myHeader'>my creations! #litty</h1>
      {recipes.map(recipe =>
        <Dish
          key={recipe.id}
          name={recipe.name}
          description ={recipe.description}
          image ={recipe.image}
          id={recipe.id}
        />

      )}
      <Footer/>
    </div>
  )
}

export default Recipes
