import { initializer } from "./router.js";
import { showCreate } from "./create.js";
import { showDashBoard } from "./dashboard.js";
import { showHomeSection } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

//detaching Elements sform DOM
document.getElementById('page').remove()

//Making routes for diffrent views
const locations = {
    '/': showHomeSection,
    '/dashboard': showDashBoard,
    '/create': showCreate,
    '/login': showLogin,
    '/register': showRegister,
}

//Making Router 
const router = initializer(locations)
router.goTo('/')
router.updateNaviagtion()