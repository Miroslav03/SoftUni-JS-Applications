import { get } from "../api.js";
import { updateNavigation } from "../app.js";
import page from '../../../../node_modules/page/page.mjs'


export async function logout(){
    await get('users/logout')
    sessionStorage.removeItem('user');
    updateNavigation()
    page.redirect('/')
}