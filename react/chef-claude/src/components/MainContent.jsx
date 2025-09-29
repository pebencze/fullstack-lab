import React, { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function MainContent() {

    const [ingredients, setIngredients] = useState([])
    const [recipeShown, setRecipeShown] = useState(false)

    const ingredientsList = ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>
    })

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients([...ingredients, newIngredient])
    }

    function toggleRecipeShown() {
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} ingredientsList={ingredientsList} toggleRecipeShown={toggleRecipeShown}/>}
            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}