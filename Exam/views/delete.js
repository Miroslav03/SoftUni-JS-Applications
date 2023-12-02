import { del } from "../api.js";
import page from "../node_modules/page/page.mjs";


export async function onDelete(context) {
    const choice = confirm('Are you sure you want to delete this theater?');

    if (choice) {
        await del(`/data/characters/${context.params.id}`)
        page.redirect('/charecters')
    }

}