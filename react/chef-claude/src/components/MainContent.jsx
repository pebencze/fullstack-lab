import React, { useState } from "react"

export default function MainContent() {

    const [ingredients, setIngredients] = useState([])

    const ingredientsList = ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>
    })

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients([...ingredients, newIngredient])
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
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}