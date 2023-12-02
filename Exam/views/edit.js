import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get, put } from "../api.js";
import page from "../node_modules/page/page.mjs";


const editTemplate = (charecter) => html`<section id="edit">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Edit Character</h2>
  <form @submit=${onEdit} id=${charecter._id} class="edit-form">
    <input
    type="text"
    name="category"
    id="category"
    placeholder="Character Type"
  />
  <input
    type="text"
    name="image-url"
    id="image-url"
    placeholder="Image URL"
  />
  <textarea
  id="description"
  name="description"
  placeholder="Description"
  rows="2"
  cols="10"
></textarea>
<textarea
  id="additional-info"
  name="additional-info"
  placeholder="Additional Info"
  rows="2"
  cols="10"
></textarea>
    <button type="submit">Edit</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`


export async function showEdit(context) {
  let id = context.params.id;
  const charecter = await get(`/data/characters/${id}`)
  render(editTemplate(charecter), document.querySelector('main'))
  document.getElementById('category').value = charecter.category;
  document.getElementById('image-url').value = charecter.imageUrl;
  document.getElementById('description').value = charecter.description;
  document.getElementById('additional-info').value = charecter.moreInfo;
}

async function onEdit(e) {
  e.preventDefault();
  const data = new FormData(e.target)

  const category = data.get("category")
  const img = data.get("image-url")
  const description = data.get("description")
  const info = data.get("additional-info")

  try {
    if (category == '' || img == '' || info == '' || description == '') {
      throw new Error('All fields must be filled!')
    }

    const settings = {
      category,
      imageUrl: img,
      description,
      moreInfo: info
    }

    await put(`/data/characters/${e.target.id}`, settings)
    e.target.reset()
    page.redirect(`/details/${e.target.id}`)
  } catch (error) {
    alert(error.message)
  }
}