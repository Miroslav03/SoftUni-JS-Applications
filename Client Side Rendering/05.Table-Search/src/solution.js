import { get } from "./api.js";
import { render } from "../../../node_modules/lit-html/lit-html.js";
import { template } from "./template.js";

function solve() {
   const input = document.getElementById('searchField');
   const tbody = document.querySelector('tbody');

   async function loadData() {
      const data = await get();
      const newData = Object.entries(data);
      render(newData.map(template), tbody);
   }
   loadData()

   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const trs = Array.from(document.querySelectorAll('tr'));
      trs.map(tr => tr.removeAttribute('class'))
      const tds = Array.from(document.querySelectorAll('td'));
      tds.map(td => {
         if (td.textContent.toLowerCase().includes(input.value.toLowerCase())) {
            const parent = td.parentElement;
            parent.className = 'select';
         }
      })
      input.value = '';
   }
}

solve()