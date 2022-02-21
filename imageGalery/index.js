console.log('60/60 Все пункты выполнены.');


const search = document.querySelector('.search');
const glass = document.querySelector('.glass');
const cross = document.querySelector('.cross');

function searchToggle () {
    if (search.value.length > 0) {
     cross.classList.add('clear');
    } else {
     cross.classList.remove('clear');   
    }
}
search.addEventListener('input', searchToggle);

function clearToggle () {
    search.value = '';
    cross.classList.remove('clear');  
}
cross.addEventListener('click', clearToggle);

let query = 'world';
async function getData() {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=18&client_id=jT_dQ8_2YYuuhXqOAyBa_6L3jVq12yqrKHMxYlv2bbU`);
    const data = await res.json();
    let link = `https://api.unsplash.com/search/photos?query=${query}&page=${Math.floor(Math.random() * (data.total_pages - 1)) + 1}&per_page=18&client_id=jT_dQ8_2YYuuhXqOAyBa_6L3jVq12yqrKHMxYlv2bbU`;
    const currRes = await fetch(link);
    const currData = await currRes.json();
    showData(currData);
}
getData();
const mainContent=document.querySelector('.main-content');
const images = document.querySelectorAll('.img');
async function showData(data){

data.results.map(el => {
    const div = document.createElement('div');
    div.classList.add('img');
    div.style.backgroundImage = `url(${el.urls.regular})`;
    mainContent.append(div);
    
});
}

function newSearch () {
    if(mainContent.hasChildNodes()) {
        mainContent.innerHTML = "";
    }
    getData();
}

glass.addEventListener('click',newSearch);


search.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        query = search.value;
        mainContent.innerHTML = "";
        getData();
    }
});

glass.addEventListener('click', () => {
    if (search.value.length > 0){
        query = search.value;
        getData(); 
    }
});





