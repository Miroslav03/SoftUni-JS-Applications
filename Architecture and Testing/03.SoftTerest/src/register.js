import { registerOperataion } from '../api/user.js';

const registerSection = document.getElementById('registerPage');
const form = registerSection.querySelector('form');
form.addEventListener('submit', onRegister)

let ctx = null;
export function showRegister(context) {
    ctx = context;
    context.showSection(registerSection);
}

async function onRegister(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        if (password.length < 3) {
            throw new Error('Password must be at least 6 characters');
        }
        if (email.length < 3) {
            throw new Error('Email must be at least 3 characters');
        }
        await registerOperataion(email, password);
        form.reset()
        ctx.goTo('/');
        ctx.updateNaviagtion()

    } catch (error) {
        alert(error.message);
        throw error;
    }
}