import { showDetails } from "./details.js";
import { showCurrentSection } from "./utils.js";

const editMovieSectiopn = document.getElementById('edit-movie');
const form = editMovieSectiopn.querySelector('form');
form.addEventListener('submit', submitNewMovieData)

export async function editMovie(id) {
    showCurrentSection(editMovieSectiopn);
    fillForm(id);
}


async function fillForm(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const resData = await res.json();

    editMovieSectiopn.querySelector('[name="title"]').value = resData.title;
    editMovieSectiopn.querySelector('[name="description"]').value = resData.description;
    editMovieSectiopn.querySelector('[name="img"]').value = resData.img;
    //setting id so we can use it in the event listener
    form.setAttribute('id',id)
}

async function submitNewMovieData(e) {
    e.preventDefault();
    const id = e.target.id

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        if(user === null){
            throw new Error('You have to be logged in to edit this movie!');
        }
        if (title == '') {
            throw new Error('Title input must be filled!');
        }
        if (description == '') {
            throw new Error('Description input must be filled!');
        }
        if (img == '') {
            throw new Error('Img input must be filled!');
        }
        const res = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                title, description, img
            })
        })


        if(!res.ok){
            throw new Error(`You don't have permissions to edit this movie!`)
        }
    
        showDetails(id);

    } catch (error) {
        alert(error.message);
    }
    
}

