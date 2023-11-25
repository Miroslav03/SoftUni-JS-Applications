import { showHome } from "./home.js";
import { showCurrentSection, updateNavigation } from "./utils.js";

const registerPageSection = document.getElementById('form-sign-up');

export function showRegister() {
    showCurrentSection(registerPageSection)
}

const section = document.getElementById('form-sign-up');

const formRegister = section.querySelector('form');
formRegister.addEventListener('submit', registerUser)

async function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(formRegister);

    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    try {
        if (email == '') {
            throw new Error('Email input must be filled!');
        }
        if (password == '') {
            throw new Error('Password input must be filled!');
        }
        if (repeatPassword == '') {
            throw new Error('Confirm Password input must be filled!');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 symbols!')
        }

        if (password !== repeatPassword) {
            throw new Error('Passwords must match!')
        }

        const resposne = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })

        })
        formRegister.reset();
        const dataResposne = await resposne.json();
        if (!dataResposne.accessToken) {
            throw new Error('User already exists!')
        }
        localStorage.setItem('user', JSON.stringify(dataResposne))
        showHome()
        updateNavigation()

    } catch (error) {
        alert(error.message)
    }

}
