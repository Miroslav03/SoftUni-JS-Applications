import { render } from '../../node_modules/lit-html/lit-html.js';
import { cats } from "./catSeeder.js";
import { catTemplate } from './template.js';

const section = document.getElementById('allCats');

render(catTemplate(cats),section);

section.addEventListener('click',showInfo);

function showInfo(e){
    const target = e.target;
    if(target.tagName === 'BUTTON'){
        const cat = target.parentElement;
        const div = cat.querySelector('div')

        console.log(target);

        if(div.style.display === 'block'){
            div.style.display = 'none';
            target.textContent = 'Show status code'
        }else{
            div.style.display = 'block';
            target.textContent = 'Hide status code'
        }
    }
}