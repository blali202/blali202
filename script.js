fetch ("data/nzbird.json")
.then((response) => response.json())
.then((data) => makeBirds(data))
.catch((error) => console.error(error));
const array = [];
function makeBirds(data){
    for (const bird of data) {
        const status = bird.status.split(" ");
        const ID = btoa(bird.scientific_name); //base64 encode (for fun)
        const bird_card = `<article class="bird" id="${ID}}">

        `
    }
}

applyfilter = document.getElementById("applyfilter");
applyfilter.addEventListener("click", function(event) {
    event.preventDefault();
    for(const bird_card of array){

    }
}

searchfilter = document.getElementById("search");
statusfilter = document.getElementById("status");
sortfilter = document.getElementById("sort");

document.getElementById('reset-filter')
.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('search').value='';
    document.getElementById('status').value='all';
    document.getElementById('sort').value='none';
    filter_button.click();
});