import { html } from "../../../../node_modules/lit-html/lit-html.js";
import { addForm } from "./addForm.js";
import { editForm } from "./editForm.js";
import { laodBooksBtn } from "./loadBooksBtn.js";
import { tableTemplate } from "./table.js";


export const mainTemplate = () => html`
${laodBooksBtn()}
${tableTemplate()}
${addForm()}
${editForm()}
`