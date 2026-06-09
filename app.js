const playerInputs =
document.getElementById("playerInputs");

/* 플레이어 10명 */

for(let i=1;i<=10;i++){

    const row =
    document.createElement("div");

    row.className =
    "player-row";

    row.innerHTML = `
        <input
            class="player-name"
            placeholder="플레이어 ${i}"
        >

        <select class="champ-count">
            <option value="1">1개</option>
            <option value="2">2개</option>
            <option value="3">3개</option>
            <option value="4">4개</option>
            <option value="5">5개</option>
        </select>
    `;

    playerInputs.appendChild(row);
}

/* 챔피언 데이터 */

let champions = [];

async function loadChampions(){

    const response =
    await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.24.1/data/ko_KR/champion.json"
    );

    const data =
    await response.json();

    champions =
    Object.values(data.data);
}

loadChampions();

/* 배열 섞기 */

function shuffle(array){

    return [...array]
    .sort(() => Math.random() - 0.5);
}

/* 랜덤 챔피언 */

function getRandomChampions(count){

    return shuffle(champions)
    .slice(0,count);
}

/* 플립 카드 생성 */

function createChampionCard(
    container,
    champion,
    delay
){

    const card =
    document.createElement("div");

    card.className =
    "champion";

    card.innerHTML = `
        <div class="flip-card">

            <div class="card-face card-back">
                ?
            </div>

            <div class="card-face card-front">

                <img
                src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.id}.png">

                <p>${champion.name}</p>

            </div>

        </div>
    `;

    container.appendChild(card);

    const flip =
    card.querySelector(".flip-card");

    setTimeout(() => {

        flip.classList.add("flipped");

    }, delay);
}

/* 추첨 */

document
.getElementById("startBtn")
.addEventListener("click", startDraw);

function startDraw(){

    if(champions.length === 0){

        alert(
        "챔피언 데이터를 불러오는 중입니다."
        );

        return;
    }

    const rows =
    document.querySelectorAll(
    ".player-row"
    );

    const resultContainer =
    document.getElementById(
    "resultContainer"
    );

    resultContainer.innerHTML = "";

    let playerCount = 0;

    rows.forEach(row => {

        const name =
        row.querySelector(".player-name")
        .value
        .trim();

        if(!name) return;

        playerCount++;

        const count =
        Number(
            row.querySelector(
            ".champ-count"
            ).value
        );

        const randomChamps =
        getRandomChampions(count);

        const card =
        document.createElement("div");

        card.className =
        "player-card";

        card.innerHTML = `
            <h3>${name}</h3>
            <div class="champion-list"></div>
        `;

        const list =
        card.querySelector(
        ".champion-list"
        );

        randomChamps.forEach(
        (champ,index) => {

            createChampionCard(
                list,
                champ,
                1000 + (index * 600)
            );

        });

        resultContainer.appendChild(card);
    });

    if(playerCount === 0){

        alert(
        "플레이어 이름을 입력해주세요."
        );

        return;
    }

    document
    .getElementById("setupPage")
    .classList.add("hidden");

    document
    .getElementById("resultPage")
    .classList.remove("hidden");
}