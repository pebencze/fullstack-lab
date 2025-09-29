import React, { useState } from "react"

export default function MainContent() {

    const [ingredients, setIngredients] = useState([])

    const ingredientsList = ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>
    })

    function handleAddIngredient(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient")
        setIngredients([...ingredients, newIngredient])
        event.target.reset()
    }

    return (
        <main>
            <form onSubmit={handleAddIngredient} className="add-ingredient-form">
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