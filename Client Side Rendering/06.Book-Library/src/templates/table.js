import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { onDelete } from "../functionality/onDelete.js";
import { onEdit } from "../functionality/onEdit.js";

export const tableTemplate = () => html`<table>
<thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
</tbody>
</table>`;

export const personTemplate = (person) => html`<tr><td>${person.title}</td>
<td>${person.author}</td>
<td>
    <button data-set ="${person.id}" @click="${onEdit}" >Edit</button>
    <button data-set ="${person.id}" @click="${onDelete}" >Delete</button>
</td></tr>`