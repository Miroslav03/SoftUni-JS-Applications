import { put } from "../api.js";
import { loadBooks } from "./loadBooks.js";

export function onEdit(e) {
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
    const form = document.getElementById('edit-form');
    const id = e.currentTarget.dataset.set;

    form.querySelectorAll('input')[1].value = e.target.parentElement.parentElement.children[0].textContent
    form.querySelectorAll('input')[2].value = e.target.parentElement.parentElement.children[1].textContent

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form)
        const author = data.get('author');
        const title = data.get('title');
        if (data == '' || author == '') {
            return
        }
        form.querySelectorAll('input')[1].value = ''
        form.querySelectorAll('input')[2].value = ''
        document.getElementById('add-form').style.display = 'block';
        document.getElementById('edit-form').style.display = 'none';
        await put({ author, title }, id);
        loadBooks()
    })
}