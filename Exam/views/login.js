import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../api.js";
import page from "../node_modules/page/page.mjs";
import { updateNavigation } from "../app.js";

const loginTemplate = html`<section id="login">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Login</h2>
  <form @submit=${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`


export function showLogin(){
    render(loginTemplate,document.querySelector('main'))
}

async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        if(email == '' || password == ''){
            throw new Error('All fields must be filled!')
        }
        const user = await post('/users/login', { email, password });
        sessionStorage.setItem('user', JSON.stringify(user))
        updateNavigation()
        page.redirect('/')
  
    } catch (error) {
        alert(error.message);
        throw error;
    }
  }