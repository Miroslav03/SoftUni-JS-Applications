import { showDetails } from "./details.js";

 export async function likeMovie(movieId) {
    

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    })
   
    

    showDetails(movieId)
}