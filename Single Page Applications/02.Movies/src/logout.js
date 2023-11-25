
import { showLogin } from "./login.js";
import { updateNavigation } from "./utils.js";

export async function logOutUser() {
  
    const user  = JSON.parse(localStorage.getItem('user'))

    const res = await fetch('http://localhost:3030/users/logout',{
        method:'get',
        headers:{'X-Authorization': user.accessToken}
    })
    
    localStorage.removeItem('user');
    updateNavigation()
    showLogin()

}