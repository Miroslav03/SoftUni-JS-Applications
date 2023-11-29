import { render } from "../../node_modules/lit-html/lit-html.js";
import { townsTemplate } from "./templates.js";
import { towns } from "./towns.js";

function search() {
   render(townsTemplate(towns), document.getElementById('towns'));
   const result = document.getElementById('result');
   const input = document.querySelector('input');
   const btn = document.querySelector('button');
   btn.addEventListener('click', () => { searchInTowns(input, result) })

}
search()

const searchInTowns = (input, result) => {
   const lis = Array.from(document.querySelectorAll('li'))
   lis.map(li => li.removeAttribute('class'))
   let matches = 0;
   lis.map(li => {
      if (li.textContent.includes(input.value)) {
         li.setAttribute('class', 'active');
         matches++;
      }
   })
   result.textContent = `${matches} matches found`
}