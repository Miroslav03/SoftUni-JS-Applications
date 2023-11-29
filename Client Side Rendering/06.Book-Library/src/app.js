import { render } from "../../../node_modules/lit-html/lit-html.js";
import { OnAdd } from "./functionality/createBook.js";
import { loadBooks } from "./functionality/loadBooks.js";
import { mainTemplate } from "./templates/mainTemplate.js";

async function onLoad() {
    const body = document.querySelector('body');
    render(mainTemplate(),body)
}
onLoad()

const loadBooksBtn = document.getElementById('loadBooks');
loadBooksBtn.addEventListener('click',loadBooks)

const formAdd = document.getElementById('add-form')
formAdd.addEventListener('submit',OnAdd)

