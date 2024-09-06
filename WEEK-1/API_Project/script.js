async function fetchData() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const imgElement = document.getElementById("pokemonSprite");
    const errorMessage = document.getElementById("errorMessage");

    try {
        // set to default empty state by clearing previous ones
        imgElement.style.display = "none";
        errorMessage.textContent = "";

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        // sprites contain the image url for a particular pokemon
        // front_default refers to the view in wich the pokemon will be displayed

        // Display the fetched pokemon image
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

    } 
    catch (error) {
        console.error(error);
        errorMessage.textContent = "Pokemon not found, please try again";
    }
}

