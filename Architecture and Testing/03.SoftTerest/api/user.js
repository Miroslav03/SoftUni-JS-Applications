import * as api from './api.js';


//Paths for this operatiosn 
const paths = {
    'register': "users/register",
    'login': "users/login",
    'logout': "users/logout",
}

//register
//login
//logout


export async function registerOperataion(email, password) {
    const user = await api.post(paths.register, { email, password });
    sessionStorage.setItem('user', JSON.stringify(user))
}

export async function loginOperataion(email, password) {
    const user = await api.post(paths.login, { email, password });
    sessionStorage.setItem('user', JSON.stringify(user))

} 
export async function logoutOperation() {
    await api.get(paths.logout);
    sessionStorage.removeItem('user')
}
//Functions for these operations



