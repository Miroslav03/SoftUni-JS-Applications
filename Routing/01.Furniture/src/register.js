import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import page from '../../../../node_modules/page/page.mjs'
import { post } from "../api.js";
import { updateNavigation } from "../app.js";

const regitserTemplate = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`
export function showRegister() {
    render(regitserTemplate(), document.querySelector('div.container'))
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('rePass');

    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        if (password == '' || email == '' || repeatPassword == '') {
            throw new Error('All fields must be filled!');
        }
        const user = await post('users/register', { email, password })
        sessionStorage.setItem('user', JSON.stringify(user))
        updateNavigation()
        page.redirect('/')

    } catch (error) {
        alert(error.message);
        throw error;
    }
}