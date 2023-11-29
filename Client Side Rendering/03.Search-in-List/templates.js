import { html } from "../../node_modules/lit-html/lit-html.js";


export const townsTemplate = (towns) => html`<ul>
${towns.map(town => html`<li>${town}</li>`)}
</ul>`





