import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import page from '../../../../node_modules/page/page.mjs'
import { post } from "../api.js";
import { updateNavigation } from "../app.js";

const regitserTemplate = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onLogin}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`
export function showLogin() {
    render(regitserTemplate(),document.querySelector('div.container'))
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
        const user = await post('users/login', { email, password });
        sessionStorage.setItem('user', JSON.stringify(user))
        updateNavigation()
        page.redirect('/')

    } catch (error) {
        alert(error.message);
        throw error;
    }
}