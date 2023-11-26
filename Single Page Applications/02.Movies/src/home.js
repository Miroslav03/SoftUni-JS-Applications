import { addMoviePage } from './add.js';
import { showDetails } from './details.js';
import { showCurrentSection } from './utils.js'

const homePageSection = document.getElementById('home-page');
const movieUl = document.getElementById('movies-list');
movieUl.addEventListener('click', detailsClick)

function detailsClick(e) {
    if (e.target.tagName === 'BUTTON') {
        if(localStorage.getItem('user')){
            e.preventDefault()
            const id = e.target.dataset.id
    
            showDetails(id)
        }else{
            e.preventDefault()

        }
        

    }
}

export function showHome() {
    if (!localStorage.getItem('user')) {
        document.getElementById('add-movie-button').style.display = 'none'
    } else {
        document.getElementById('add-movie-button').style.display = 'block'
        document.getElementById('add-movie-button').addEventListener('click',addMoviePage)
    }
    showCurrentSection(homePageSection);
    displayMovies();
}

async function displayMovies() {

    const movies = await getMovies();
    movieUl.replaceChildren(...movies.map(createMoviesPrivew))

}

function createMoviesPrivew(movie) {
    const li = document.createElement('li');
    li.className = 'card mb-4';
    li.innerHTML = `
    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
        <a href="/details/${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>
    <div class="card-footer">
    </div>`;
    return li;
}



async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies');
    const movies = await response.json()

    return movies
}

