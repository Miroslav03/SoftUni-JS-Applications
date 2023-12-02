import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";

const detailsTemplate = (charecter,isUser) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=".${charecter.imageUrl}" alt="example1" />
  <div>
  <p id="details-category">${charecter.category}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p id="description">
        ${charecter.description}
        </p>
         <p id ="more-info">
          ${charecter.moreInfo}
              </p>
    </div>
  </div>
    <h3>Is This Useful:<span id="likes">0</span></h3>

     <!--Edit and Delete are only for creator-->
<div id="action-buttons">
${isUser ? html`<a href='${`/edit/${charecter._id}`}' id="edit-btn">Edit</a>` : null}    
${isUser ? html`<a href='${`/delete/${charecter._id}`}' id="delete-btn">Delete</a>` : null}
   <!--Bonus - Only for logged-in users ( not authors )-->
${isUser ? html`<a href="" id="like-btn">Like</a>` : null}

  
</div>
  </div>
</div>
</section>`


export async function showDetails(context) {
  const charecter = await getCharecter(context.params.id)
  const user = JSON.parse(sessionStorage.getItem('user'));
  let isUser = null;
  if(user){
    if (user._id === charecter._ownerId) {
      isUser = true
  } else {
      isUser = false
  }
  }
  
  render(detailsTemplate(charecter,isUser), document.querySelector('main'))
}

async function getCharecter(id) {
  return get(`/data/characters/${id}`)
}
