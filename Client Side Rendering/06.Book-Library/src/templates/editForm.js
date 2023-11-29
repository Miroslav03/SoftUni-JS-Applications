import { html } from "../../../../node_modules/lit-html/lit-html.js";


export const editForm = () => html`<form id="edit-form" style="display: none">
<input type="hidden" name="id">
<h3>Edit book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Save">
</form>`