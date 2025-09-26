export default function MainContent() {

    const ingredients = ["Oregano", "Chicken", "Tomato"]

    const ingredientsList = ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>
    })

    function handleAddIngredient(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData.get("ingredient"))
        console.log("Ingredient added!")
    }

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={handleAddIngredient}>
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>
            <ul>
                {ingredientsList}
            </ul>
        </main>
    )
}