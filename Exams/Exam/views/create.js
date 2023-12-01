import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { post } from "../api.js";
import page from '../../../../node_modules/page/page.mjs'

const createTemplate = html`<section id="create">
<div class="form">
  <h2>Add Fact</h2>
  <form @submit=${onCreate} class="create-form">
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
    <button type="submit">Add Fact</button>
  </form>
</div>
</section>`



export function showCreate() {
  render(createTemplate, document.querySelector('main'))
}


async function onCreate(e) {
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
      imageUrl:img, 
      description, 
      moreInfo:info
    } 
    
    await post('data/facts', settings)
    e.target.reset()
    page.redirect('/dashboard')
  } catch (error) {
    alert(error.message)
  }
}
