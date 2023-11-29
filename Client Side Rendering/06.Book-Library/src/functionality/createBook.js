import { post } from "../api.js";
import { loadBooks } from "./loadBooks.js";


export async function OnAdd(e) {
    e.preventDefault();
    const data = new FormData(e.target)
    const author = data.get('author');
    const title = data.get('title');

    if(data == '' || title == ''){
        return
    }
    await post({ author, title });
    loadBooks()
}
