import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../api.js";
import page from "../node_modules/page/page.mjs";


const createTemplate = html`<section id="create">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Add Character</h2>
  <form @submit=${onCreate} class="create-form">
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
    <button type="submit">Add Character</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
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
    
    await post('/data/characters', settings)
    e.target.reset()
    page.redirect('/charecters')
  } catch (error) {
    alert(error.message)
  }
}
