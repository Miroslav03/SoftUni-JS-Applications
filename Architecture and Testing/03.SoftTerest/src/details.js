import { deleteIdea, getIdeaById } from "../api/data.js"

const detailsSection = document.getElementById('detailsPage')

export async function showDetails(context, id) {
    context.showSection(detailsSection)
    //getting idea from server
    const idea = await getIdeaById(id);
    const userData = JSON.parse(sessionStorage.getItem('user'))
    const isOwner = userData && userData._id == idea._ownerId;
    detailsSection.innerHTML = createIdea(idea, isOwner);
    if(isOwner){
        detailsSection.querySelector('a').addEventListener('click', async (e) => {
            e.preventDefault()
            await deleteIdea(id);
            context.goTo('/dashboard')
        }) 
    }
  
}

function createIdea(idea, isOwner) {
    let html = `<img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`

    if (isOwner) {
       html+= `<div class="text-center">
        <a class="btn detb" href="">Delete</a>
    </div>`
    }

    return html
}