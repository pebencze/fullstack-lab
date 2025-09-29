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
            {ingredients.length > 0 && <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsList}</ul>
                {ingredients.length >= 4 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a recipe</button>
                </div>}
            </section>}
        </main>
    )
}