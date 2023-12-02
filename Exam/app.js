import page from '../node_modules/page/page.mjs'
import { showHome } from './views/home.js'
import { showLogin } from './views/login.js'
import { showRegister } from './views/register.js'
import { logout } from './views/logout.js'
import { showCharecters } from './views/charecters.js'
import { showCreate } from './views/create.js'
import { showEdit } from './views/edit.js'
import { showDetails } from './views/details.js'
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

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', logout);
page('/charecters', showCharecters)
page('/add', showCreate)
page('/edit/:id', showEdit)
page('/details/:id', showDetails)
page('/delete/:id', onDelete)
updateNavigation()
page.start()