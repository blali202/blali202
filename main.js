const birdlist = "data/nzbird.json";
const displaybirds = document.getElementById("bird-tab");
const birdarray = [];
const statusColors = {
    "not threatened": "#02a028",
    "naturally uncommon": "#649a31",
    "relict": "#99cb68",
    "recovering": "#fecc33",
    "declining": "#fe9a01",
    "nationally increasing": "#c26967",
    "nationally vulnerable": "#9b0000",
    "nationally endangered": "#660032",
    "nationally critical": "#320033",
    "extinct": "black",
    "data deficient": "black"
};
fetch(birdlist)
    .then((response) => response.json())
    .then((data) => makeBirds(data))
    .catch((error) => console.error(error));

function makeBirds(data) {
    for (const bird of data) {
        const status = bird.status.split(" ");
        const ID = btoa(bird.scientific_name); //base64 encoded for to see if i could

        const nameDisplay = bird.original_name && bird.original_name.trim() ? `${bird.common_name} | ${bird.original_name}` : bird.common_name;

        const bird_tab = `<article class="bird" id="${ID}">
            <div class="image-area">
                <img class="bird-image" src=${bird.photo.source} alt="${bird.common_name}"/>
                <div class="bird-name">
                    <h1>${nameDisplay}</h1>
                    <p class="rights">Photo taken by ${bird.photo.credit}</p>
                </div>
                <div class="details hide" id="details-${ID}">
                    <dl>
                        <div class="scientific-name">
                            <dt>Scientific Name</dt>
                            <dd>${bird.scientific_name}</dd>
                        </div>
                        <div class="bird-family">
                            <dt>Family</dt>
                            <dd>${bird.family}</dd>
                        </div>
                        <div class="bird-order">
                            <dt>Order</dt>
                            <dd>${bird.order}</dd>
                        </div>
                        <div class="bird-status" style="background-color: ${statusColors[bird.status.toLowerCase()] || 'grey'};">
                            <dt>Status</dt>
                            <dd>${bird.status}</dd>
                        </div>
                        <div class="bird-length">
                            <dt>Length</dt>
                            <dd>${bird.length}</dd>
                        </div>
                        <div class="bird-weight">
                            <dt>Weight</dt>
                            <dd>${bird.weight}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <button class="details-button" onclick="toggleDetails('${ID}')">Details</button>
        </article>`;

        bird.element = document.createElement('div');
        bird.element.innerHTML = bird_tab;
        bird.element = bird.element.firstElementChild;
        birdarray.push(bird);
    }
    updateBirdDisplay();
}

function updateBirdDisplay() {
    displaybirds.innerHTML = '';

    const filteredBirds = birdarray.filter(bird => {
        const likestatus = bird.status.toLowerCase().includes(statusfilter.value) || statusfilter.value === "all";
        const liketext = Object.values(bird).some(value => value.toString().normalize("NFC").toLowerCase().includes(searchinput.value.normalize("NFC").toLowerCase()));
        return likestatus && liketext;
    });

    switch (sortfilter.value) {
        case "none":
            break;
        case "aToZ":
            filteredBirds.sort((a, b) => a.common_name.localeCompare(b.common_name));
            break;
        case "zToA":
            filteredBirds.sort((a, b) => b.common_name.localeCompare(a.common_name));
            break;
        case "heaviest":
            filteredBirds.sort((a, b) => parseWeight(b.weight) - parseWeight(a.weight));
            break;
        case "lightest":
            filteredBirds.sort((a, b) => parseWeight(a.weight) - parseWeight(b.weight));
            break;
    }

    
    for(const bird of filteredBirds){
        displaybirds.appendChild(bird.element);
    }
    document.getElementById("num-results").textContent = `${filteredBirds.length} result${filteredBirds.length !== 1 ? 's' : ''} found`;
}

applyfilter.addEventListener('click', function(event) {
    event.preventDefault();
    updateBirdDisplay();
});

document.getElementById('resetfilter').addEventListener('click', function(event) {
    event.preventDefault();
    searchinput.value = '';
    statusfilter.value = 'all';
    sortfilter.value = 'none';
    updateBirdDisplay();
});

function parseWeight(weightString) {
    weightString = weightString.toLowerCase();
    stringArray = weightString.split(" ");
    if(stringArray[1] === ('g')){
        return parseFloat(stringArray[0]);
    } else if (stringArray[1] === ("kg")){
        return 1000*parseFloat(stringArray[0]);
    } else if (stringArray[1] === ('-')){
        if (stringArray[3] === ('g')){
            return parseFloat(stringArray[0]);
        }   else {
            return 1000*parseFloat(stringArray[0]);
        }
    }
}

function toggleDetails(ID) {
    const details = document.getElementById(`details-${ID}`);
    details.classList.toggle("show");
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-footer');
    const footer = document.querySelector('.footer');
  
    toggleButton.addEventListener('click', function () {
      footer.classList.toggle('hidden');
    });
  });

