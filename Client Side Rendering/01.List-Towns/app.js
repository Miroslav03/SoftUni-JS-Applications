import { html, render } from '../../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const form = document.querySelector('form');
form.addEventListener('submit', loadTowns);

function loadTowns(e) {
    const input = form.querySelector('input');
    const arr = input.value.split(', ');
    e.preventDefault();
    const template = html`<ul>
        ${arr.map((el) => html`<li>${el}</li>`)}
        </ul>`

    render(template, root)
}




