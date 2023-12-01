import page from '../../../node_modules/page/page.mjs'
import { showCatalog } from './src/catalog.js';
import { showCreate } from './src/create.js';
import { showDetails } from './src/details.js';
import { showEdit } from './src/edit.js';
import { showLogin } from './src/login.js';
import { showMyFurniture } from './src/myfurniture.js';
import { showRegister } from './src/register.js';
import { onDelete } from './src/delete.js';
import { get } from './api.js';

export function updateNavigation() {
    if (sessionStorage.getItem('user')) {
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    } else {
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await get('users/logout')
    sessionStorage.removeItem('user');
    updateNavigation()
    page.redirect('/')
})
updateNavigation()
page('/', showCatalog);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/my-publications', showMyFurniture);
page('/details/:id', showDetails);
page('/edit/:id', showEdit)
page('/delete/:id', onDelete)
page.start()