import { del } from "../api.js";

export async function onDelete(e){
    const id = e.currentTarget.dataset.set;
    await del(id);
    const data= e.target.parentElement.parentElement
    data.remove()
}