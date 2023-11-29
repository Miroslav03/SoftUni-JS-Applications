import { render } from "../../../../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";
import { personTemplate } from "../templates/table.js";

export async function loadBooks() {
    const data = await get()
    const books = [];
    
    for (const [id, obj] of Object.entries(data)) {
        books.push({ id, title: obj.title, author: obj.author })
    }
    
    render(books.map(personTemplate),document.querySelector('tbody'))
}