import { showHome } from "./home.js";
import { showCurrentSection, updateNavigation } from "./utils.js";

const loginPageSection = document.getElementById('form-login');

 export function showLogin(){
    showCurrentSection(loginPageSection);
}

const section = document.getElementById('form-login');
const loginForm = section.querySelector('form')


loginForm.addEventListener('submit',loginUser)

async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password= formData.get('password');

    try {
        if(email === ''){
            throw new Error('Email field must be filled');
        }
        if(password === ''){
            throw new Error('Password field must be filled')
        }

        const res = await fetch('http://localhost:3030/users/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        if(!res.ok){
            throw new Error(res.status)
        }

        const resData = await res.json();

        localStorage.setItem('user',JSON.stringify(resData))
        updateNavigation()
        showHome()
        loginForm.reset()
        
    } catch (error) {
        alert(error.message)
    }
}
