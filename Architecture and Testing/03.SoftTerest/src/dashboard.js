import { getAllIdeas } from "../api/data.js";

const dashboardSection = document.getElementById('dashboard-holder');
dashboardSection.addEventListener('click',clickedButton)

let ctx = null;
export async function showDashBoard(context) {
    ctx = context;
    context.showSection(dashboardSection);
    const ideas = await getAllIdeas();
    if (!ideas.length) {
        dashboardSection.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    } else {
        dashboardSection.replaceChildren(...ideas.map(createIdea))
    }
}

function createIdea(idea) {
    const div = document.createElement('div');
    div.className = 'card overflow-hidden current-card details';
    div.style.width = '20rem';
    div.style.height = '18rem';
    div.innerHTML = `<div class="card-body">
    <p class="card-text">${idea.title}</p>
</div>
<img class="card-image" src="${idea.img}" alt="Card image cap">
<a class="btn" data-id=${idea._id} href="/details">Details</a>`
    return div;
}

function clickedButton(e) {
    e.preventDefault()
    if (e.target.tagName === 'A') {
        const id = e.target.dataset.id
        ctx.goTo(`/details`,id)
    }
}