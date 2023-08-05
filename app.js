const allPlayers = () => {
    const searchValue = document.getElementById('search-box').value;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.player));
    console.log(searchValue);
};

const showPlayerDetails = (players) => {
    const parent = document.getElementById('player-container');
    parent.innerHTML = ``;
    for (const player of players) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>Name: ${player.strPlayer}</h2>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="all-button">
                <button class="btn btn-danger">Delete</button>
                <button class="btn btn-success">Details</button>
            </div>
        </div>
    `;
        parent.appendChild(div);
    }
    console.log(players);

};