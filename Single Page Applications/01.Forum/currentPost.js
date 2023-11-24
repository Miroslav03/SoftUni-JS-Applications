import { createElement } from "./utils.js";

export const mainCurrentPost = document.getElementById('theme-content');

const a = document.querySelector('a');
a.addEventListener('click', loadHome)

function loadHome(e) {
    window.location = './index.html'
    localStorage.clear()
}

const form = document.querySelector('form');
form.addEventListener('submit', postComment)

const divClassComent = document.querySelector('div[class="comment"]')
const h2 = document.querySelector('h2')

window.addEventListener('DOMContentLoaded', createAuthorComment)
window.addEventListener('DOMContentLoaded', loadAllComments)

async function createAuthorComment() {
    const id = localStorage.getItem('id');
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (response.ok == false) {
            throw new Error('Error')
        }
        const dataResponse = await response.json();
        const currentTopic = Object.entries(dataResponse).filter(arr => arr[0] === id);
        
        h2.textContent = currentTopic[0][1].topicName
        //creating Author Comment
        const divClassHeader = createElement('div', '', divClassComent, { 'class': 'header' });
        const img = createElement('img', '', divClassHeader, { 'src': './static/profile.png', 'alt': 'avatar' })
        const nameParagraph = createElement('p', '', divClassHeader, {})
        nameParagraph.innerHTML = `<span>${currentTopic[0][1].username}</span> posted on <time>${currentTopic[0][1].date}</time>`
        const textParagraph = createElement('p', currentTopic[0][1].postText, divClassHeader, { 'class': 'post-content' })
    } catch (error) {
        alert(error.message);
    }
}

async function postComment(e) {
    e.preventDefault()
    const id = localStorage.getItem('id');

    const formData = new FormData(form)

    const postText = formData.get('postText');
    const username = formData.get('username');
    const date = new Date()
    try {
        if (postText == '') {
            throw new Error('Comment must be filled!');
        } if (username == '') {
            throw new Error('Username must be filled!');
        } 
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id, postText, username, date
            })
        });
        if (response.ok == false) {
            throw new Error('Error')
        }
        const responseData = await response.json()


        const divTopicNameWrapper = createElement('div', '', divClassComent, { 'class': 'topic-name-wrapper' });
        const divTopicName = createElement('div', '', divTopicNameWrapper, { 'class': 'topic-name' });
        const nameParagraph = createElement('p', '', divTopicName, {})
        nameParagraph.innerHTML = `<strong>${responseData.username}</strong> commented on <time>${responseData.date}</time>`
        const divPostContent = createElement('div', '', divTopicName, { 'class': 'post-content' });
        createElement('p', responseData.postText, divPostContent, {})

        form.reset()
    } catch (error) {
        alert(error.message);
    }
}

async function loadAllComments(){
    try {
        const id = localStorage.getItem('id');
        const response  = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`)
        if(!response.ok){
            throw new Error('Error')
        }
        const responseData = await response.json()
        const filteredComments = Object.entries(responseData).filter(arr => arr[1].id === id)
        for (const [key,obj] of filteredComments) {
            const divTopicNameWrapper = createElement('div', '', divClassComent, { 'class': 'topic-name-wrapper' });
            const divTopicName = createElement('div', '', divTopicNameWrapper, { 'class': 'topic-name' });
            const nameParagraph = createElement('p', '', divTopicName, {})
            nameParagraph.innerHTML = `<strong>${obj.username}</strong> commented on <time>${obj.date}</time>`
            const divPostContent = createElement('div', '', divTopicName, { 'class': 'post-content' });
            const paragraphPostContent = createElement('p', obj.postText, divPostContent, {})
        }
    } catch (error) {
        alert(error.message);

    }

}