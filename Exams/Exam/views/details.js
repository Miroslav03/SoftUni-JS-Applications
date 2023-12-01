import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";

const detailsTemplate = (fact,isUser) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="./images/fact 1.png" alt="example1" />
  <p id="details-category">${fact.category}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p id="description">
        ${fact.description}
        </p>
         <p id ="more-info">
          ${fact.moreInfo}
              </p>
    </div>

    <h3>Likes:<span id="likes">0</span></h3>

     <!--Edit and Delete are only for creator-->
<div id="action-buttons">
${isUser ? html`<a href='${`/edit/${fact._id}`}' id="edit-btn">Edit</a>` : null}    
${isUser ? html`<a href='${`/delete/${fact._id}`}' id="delete-btn">Delete</a>` : null}
   <!--Bonus - Only for logged-in users ( not authors )-->
  <a href="" id="like-btn">Like</a>

</div>
  </div>
</div>
</section>`


export async function showDetails(context) {
  const fact = await getFact(context.params.id)
  const user = JSON.parse(sessionStorage.getItem('user'));
  let isUser = null;
  if (user._id === fact._ownerId) {
      isUser = true
  } else {
      isUser = false
  }
  render(detailsTemplate(fact,isUser), document.querySelector('main'))
}

async function getFact(id) {
  return get(`data/facts/${id}`)
}
