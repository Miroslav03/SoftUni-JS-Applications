import { createIdea } from "../api/data.js";

const createSection = document.getElementById('createPage');
const form = createSection.querySelector('form');
form.addEventListener('submit', OnCreate)
let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(createSection);
}

async function OnCreate(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imgURL = formData.get('imageURL');


    try {

        if(title.length<6){
            throw new Error('Title must be at least 6 charecters')
        }
        if(description.length<10){
            throw new Error('Description must be at least 10 charecters')
        }
        if(imgURL.length<5){
            throw new Error('imgURL must be at least 5 charecters')
        }

        await createIdea({ title, description, img: imgURL })
        form.reset()
        ctx.goTo('/dashboard')
    
    } catch (error) {
        alert(error.message)
    }
}

