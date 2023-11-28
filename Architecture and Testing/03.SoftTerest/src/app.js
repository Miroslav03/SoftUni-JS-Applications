import { initializer } from "./router.js";
import { showCreate } from "./create.js";
import { showDashBoard } from "./dashboard.js";
import { showHomeSection } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { logoutOperation } from "../api/user.js";
import { showDetails } from "./details.js";

//detaching Elements sform DOM
document.getElementById('page').remove()

async function logout() {
    await logoutOperation()
    router.goTo('/')
    router.updateNaviagtion()
}

//Making routes for diffrent views
const locations = {
    '/': showHomeSection,
    '/dashboard': showDashBoard,
    '/create': showCreate,
    '/login': showLogin,
    '/register': showRegister,
    '/logout': logout,
    '/details':showDetails
}

//Making Router 
const router = initializer(locations)
router.goTo('/')
router.updateNaviagtion()