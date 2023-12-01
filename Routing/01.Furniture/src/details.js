import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { get } from "../api.js";

const detailsTemplate = (furniture, isUser) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${furniture.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${furniture.make}</span></p>
                <p>Model: <span>${furniture.model}</span></p>
                <p>Year: <span>${furniture.year}</span></p>
                <p>Description: <span>${furniture.description}</span></p>
                <p>Price: <span>${furniture.price}$</span></p>
                <p>Material: <span>${furniture.material}</span></p>
                <div>
                ${isUser ? html`<a href='${`/edit/${furniture._id}`}' class="btn btn-info">Edit</a>` : null}    
                ${isUser ? html`<a href='${`/delete/${furniture._id}`}' class="btn btn-red">Delete</a>` : null}
                </div>
            </div>
        </div>`


export async function showDetails(context) {
    const furniture = await getFurniture(context.params.id)
    const user = JSON.parse(sessionStorage.getItem('user'));
    let isUser = null;
    if (user._id === furniture._ownerId) {
        isUser = true
    } else {
        isUser = false
    }
    render(detailsTemplate(furniture, isUser), document.querySelector('div.container'))
}

async function getFurniture(id) {
    return get(`data/catalog/${id}`)
}

