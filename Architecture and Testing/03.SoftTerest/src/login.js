import { loginOperataion } from "../api/user.js";

const loginSection = document.getElementById('loginPage');

const form = loginSection.querySelector('form');
form.addEventListener('submit', onLogin)

let ctx = null;
export function showLogin(context) {
    ctx = context;
    context.showSection(loginSection);
}

async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        await loginOperataion(email, password); 
        form.reset();
        ctx.goTo('/');
        ctx.updateNaviagtion();

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
