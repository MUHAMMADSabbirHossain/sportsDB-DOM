const allPlayers = () => {
    const searchValue = document.getElementById('search-box').value;
    document.getElementById("spinner").style.display = "block";

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`;
    console.log(url);
    document.getElementById('search-box').value = '';
    fetch(url)
        .then(res => res.json())
        // .then(data => showPlayerDetails(data.player));
        .then(data => {
            console.log(data.player == null)
            if (data.player == null) {
                document.getElementById("spinner").style.display = "block";
            } else {
                showPlayerDetails(data.player);
                document.getElementById("spinner").style.display = "none";
            }
        });

    console.log(searchValue);
};

const showPlayerDetails = (players) => {
    if (players) {
        document.getElementById("spinner").style.display = "none";
    } else {
        document.getElementById("spinner").style.display = "block";
    }
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
                <button onclick="details(${player.idPlayer})" class="btn btn-success">Details</button>
            </div>
        </div>
    `;
        parent.appendChild(div);
    };
    console.log(players);
};

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]));
    console.log('test', info);
};

const setDetails = (info) => {
    if (info.str == "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }

    document.getElementById('details-container').innerHTML = `
        <div>
            <img src="" alt="">
            <h1>Name: ${info.strPlayer}</h1>
            <h5>Date of Birth: ${info.dateBorn}</h5>
            <p>Bio: ${info.strDescriptionEN}</p>
        </div>
    `;

    console.log(info);
}