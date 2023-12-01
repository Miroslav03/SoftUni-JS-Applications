console.log('hello');
import page from '../../../node_modules/page/page.mjs'
import { showHome } from './views/home.js'
import { showLogin } from './views/login.js'
import { showRegister } from './views/register.js'
import { logout } from './views/logout.js'
import { showCreate } from './views/create.js'
import { showDashboard } from './views/dashboard.js'
import { showDetails } from './views/details.js'
import { showEdit } from './views/edit.js'
import { onDelete } from './views/delete.js';

export function updateNavigation() {
    if (sessionStorage.getItem('user')) {
        document.querySelector('div.user').style.display = 'inline-block'
        document.querySelector('div.guest').style.display = 'none'
    } else {
        document.querySelector('div.user').style.display = 'none'
        document.querySelector('div.guest').style.display = 'inline-block'
    }
}

updateNavigation()
page('/',showHome);
page('/login',showLogin);
page('/register',showRegister);
page('/logout',logout);
page('/add',showCreate)
page('/dashboard',showDashboard)
page('/details/:id',showDetails)
page('/edit/:id',showEdit)
page('/delete/:id',onDelete)
page.start()