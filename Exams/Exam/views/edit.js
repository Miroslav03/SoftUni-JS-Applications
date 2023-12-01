import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { get, put } from "../api.js";
import page from '../../../../node_modules/page/page.mjs'




const editTemplate = (fact) => html`<section id="edit">
<div class="form">
  <h2>Edit Fact</h2>
  <form @submit=${onEdit} id=${fact._id} class="edit-form">
    <input
    type="text"
    name="category"
    id="category"
    placeholder="Category"
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
  rows="10"
  cols="50"
></textarea>
<textarea
  id="additional-info"
  name="additional-info"
  placeholder="Additional Info"
  rows="10"
  cols="50"
></textarea>
    <button type="submit">Post</button>
  </form>
</div>
</section>`


export async function showEdit(context) {
  let id = context.params.id;
  const fact = await get(`data/facts/${id}`)
  render(editTemplate(fact), document.querySelector('main'))
  document.getElementById('category').value = fact.category;
  document.getElementById('image-url').value = fact.imageUrl;
  document.getElementById('description').value = fact.description;
  document.getElementById('additional-info').value = fact.moreInfo;
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

    await put(`data/facts/${e.target.id}`, settings)
    e.target.reset()
    page.redirect('/dashboard')
  } catch (error) {
    alert(error.message)
  }
}

