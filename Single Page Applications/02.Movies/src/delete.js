import { showHome } from "./home.js";

export async function deleteMovie(id){
    const userData = JSON.parse(localStorage.getItem('user'));
    
    try {
        const res = await fetch(`http://localhost:3030/data/movies/${id}`,{
            method:'Delete',
            headers:{'X-Authorization':userData.accessToken}
        })
        if(!res.ok){
            throw new Error(`You don't have the rights to delete this movie!`)
        }
    } catch (error) {
        alert(error.message)
    }
    showHome()
}