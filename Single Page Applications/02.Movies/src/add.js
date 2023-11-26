import { showHome } from "./home.js";
import { showCurrentSection } from "./utils.js";

const addMovieSection = document.getElementById('add-movie');
const form = addMovieSection.querySelector('form');
form.addEventListener('submit',addMovie)

export function addMoviePage(){
    showCurrentSection(addMovieSection)
}


async function addMovie(e){

    e.preventDefault();
  
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    const user = JSON.parse(localStorage.getItem('user'));

    try {
        if (title == '') {
            throw new Error('Title input must be filled!');
        }
        if (description == '') {
            throw new Error('Description input must be filled!');
        }
        if (img == '') {
            throw new Error('Img input must be filled!');
        }
        const res = await fetch(`http://localhost:3030/data/movies`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': user.accessToken
            },
            body: JSON.stringify({
                title, description, img
            })
        })


        if(!res.ok){
            throw new Error(res.statusText)
        }
        form.reset()
        showHome();

    } catch (error) {
        alert(error.message);
    }
}