import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { logOutUser } from "./logout.js";
import { showRegister } from "./register.js";
import { updateNavigation } from "./utils.js";

const routes = {
    "/": showHome,
    "/login": showLogin,
    "/register": showRegister,
    '/logout':logOutUser
}

document.querySelector('nav').addEventListener('click', navigate)

function navigate(event) {
    //checking if we clicked on href anker and changing view
    if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        const url = new URL(event.target.href);

        const visit = routes[url.pathname];

        visit()
    }
}

showHome()
updateNavigation()