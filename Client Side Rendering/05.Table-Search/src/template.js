import { html } from "../../../node_modules/lit-html/lit-html.js";


export const template = (student) => html`<tr><td>${student[1].firstName} ${student[1].lastName}</td>
<td>${student[1].email}</td>
<td>${student[1].course}</td></tr>`