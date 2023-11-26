import { deleteMovie } from "./delete.js";
import { editMovie } from "./edit.js";
import { likeMovie } from "./like.js";
import { checkOwner, showCurrentSection } from "./utils.js";

const movieDetailsSection = document.getElementById('movie-example');

export async function showDetails(id) {

    showCurrentSection(movieDetailsSection);

    const movie = await getMovie(id)//returns promise has to be awaited!
    const totalLikes = await getLikes(movie._id)//returns promise has to be awaited!

    movieDetailsSection.replaceChildren(createMovieHTML(movie, totalLikes))


}

function createMovieHTML(movie, totalLikes) {


    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `<div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>
    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}"alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        ${createButtons(movie._ownerId, movie._id)}
        <span class="enrolled-span">Liked ${totalLikes}</span>
    </div>
</div>`

    return div;
}

async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movieData = await res.json();

    return movieData
}

movieDetailsSection.addEventListener('click', btnFunctionalities)


function btnFunctionalities(e) {
    const id = e.target.id;
    e.preventDefault();
    if (e.target.tagName === 'A' && e.target.textContent === 'Edit') {
        editMovie(id)
    }
    if (e.target.tagName === 'A' && e.target.textContent === 'Delete') {
        deleteMovie(id)
    }
    if (e.target.tagName === 'A' && e.target.textContent === 'Like') {
        likeMovie(id)

    }

}

async function getLikes(id) {
    try {
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        const data = await res.json()
        return data
    } catch (error) {
        alert(error.message)
    }
}

function createButtons(movieId, id) {

    if (checkOwner(localStorage.getItem('user'), movieId)) {
        return `<a class="btn btn-danger" id=${id} href="#">Delete</a>
                <a class="btn btn-warning" id=${id} href="#">Edit</a>`;

    } else {
        return `<a class="btn btn-primary" id=${id} href="#">Like</a>`;
    }
}



