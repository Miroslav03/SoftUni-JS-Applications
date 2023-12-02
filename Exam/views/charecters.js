import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";


const dashboardTemplate = (data) => html`<h2>Characters</h2>
<section id="characters">
  ${data.map(charecter => html`<div class="character">
    <img src=".${charecter.imageUrl}" alt="example1" />
    <div class="hero-info">
      <h3 class="category">${charecter.category}</h3>
      <p class="description">${charecter.description}</p>
      <a class="details-btn" href="/details/${charecter._id}">More Info</a>
    </div>
  </div>`)}
</section>
  `

const dashboardEmpty = html`<h2>No added Heroes yet.</h2>
`

export async function showCharecters() {
  const data = await get('/data/characters?sortBy=_createdOn%20desc')
  if(Object.keys(data).length === 0){
    render(dashboardEmpty, document.querySelector('main'))
  }else{
    render(dashboardTemplate(data), document.querySelector('main'))
  }
}