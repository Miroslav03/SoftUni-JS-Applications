import { menuTemplate } from "./template.js";
import { get, post } from "./api.js";
import { render } from "../../../node_modules/lit-html/lit-html.js";

const addBtn = document.querySelector('input[type="submit"]').addEventListener('click', addNewItem);
const menu = document.getElementById('menu');
const input = document.getElementById('itemText');


async function displayItems() {
    const data = await get()
    const newData = Object.entries(data);
    render(newData.map(menuTemplate), menu);
}

displayItems()


async function addNewItem(e) {
    e.preventDefault();
    debugger
    await post(input.value);
    displayItems()
}