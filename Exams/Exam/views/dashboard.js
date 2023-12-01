import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";


const dashboardTemplate = (data) => html` <h2>Fun Facts</h2>
<section id="dashboard">
  <!-- Display a div with information about every post (if any)-->
  ${data.map(fact => html`<div class="fact">
    <img src="${fact.imageUrl}" />
    <h3 class="category">${fact.category}</h3>
    <p class="description">${fact.description}</p>
    <a class="details-btn" href="/details/${fact._id}">More Info</a>
  </div>`)}
  `



const dashboardEmpty = html`<h2>No Fun Facts yet.</h2>`

export async function showDashboard() {
  const data = await get('data/facts?sortBy=_createdOn%20desc')
  if(Object.keys(data).length === 0){
    render(dashboardEmpty, document.querySelector('main'))
  }else{
    render(dashboardTemplate(data), document.querySelector('main'))
  }
}