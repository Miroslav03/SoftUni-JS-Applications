import { get } from "../api.js";
import page from "../node_modules/page/page.mjs";
import { updateNavigation } from "../app.js";



export async function logout(){
    await get('/users/logout')
    sessionStorage.removeItem('user');
    updateNavigation()
    page.redirect('/')
}