import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../api.js";
import page from "../node_modules/page/page.mjs";
import { updateNavigation } from "../app.js";


const registerTemplate = html`<section id="register">
          
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Register</h2>
  <form @submit=${onSubmit} class="register-form">
    <input
      type="text"
      name="email"
      id="register-email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="register-password"
      placeholder="password"
    />
    <input
      type="password"
      name="re-password"
      id="repeat-password"
      placeholder="repeat password"
    />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="#">Login</a></p>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>

</section>`


export function showRegister(){
    render(registerTemplate,document.querySelector('main'))
}


async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('re-password');
    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        if (password == '' || email == '' || repeatPassword == '') {
            throw new Error('All fields must be filled!');
        }
        const user = await post('/users/register', { email, password })
        sessionStorage.setItem('user', JSON.stringify(user))
        updateNavigation()
        page.redirect('/')
  
    } catch (error) {
        alert(error.message);
        throw error;
    }
  }
