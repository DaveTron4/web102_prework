function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function searchGame() {
    const gameName = document.getElementById('game-name').value;
    const gameCardDiv = document.getElementById('game-info');

    deleteChildElements(gameCardDiv);

    const response = await fetch(`/api/games?search=${gameName}`);
    const data = await response.json();

    if (!gameName) {
        gameCardDiv.innerHTML = '<p>Please enter a game name.</p>';
        return;
    }


    if (data.results && data.results.length > 0) {
        for (let i = 0; i < data.results.length; i++){

            const game = data.results[i]; // Get the first game in the results
            
            const gameName = game.name;
            const releaseDate = game.released;
            const imageUrl = game.background_image;
            const rating = game.rating;

            // create a new div element, which will become the game card
            let div = document.createElement('div')
    
            // add the class game-card to the list
            div.classList.add('game-card');
    
            // Display the game info
            div.innerHTML = `
                <img src="${imageUrl}" alt="${gameName}" class="game-img">
                <h3>${game.name}</h3>
                <p><strong>Released:</strong> ${releaseDate}</p>
            `;
    
            gameCardDiv.appendChild(div)
        }



    } else {
        // Add <p> for the this to edit the style of it, also to other similar things
        gameCardDiv.innerHTML = '<p>No game found with that name.</p>';
    }
}