import { del } from "../api.js";
import page from '../../../../node_modules/page/page.mjs'

export async function onDelete(context){
    await del(`data/catalog/${context.params.id}`)
    page.redirect('/')
}