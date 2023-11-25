
import { createElement } from "./utils.js";


//home topic div
const topicContainerDiv = document.querySelector('div[class="topic-container"]');


const form = document.querySelector('form');

export async function postTopic(e) {
    e.preventDefault()
    //create newTopic in server
    const formData = new FormData(form);

    const topicName = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const postText = formData.get('postText').trim();
    const date = new Date();
    try {
        if (topicName == '') {
            throw new Error('Topic name must be filled!');
        } if (username == '') {
            throw new Error('Username must be filled!');
        } if (postText == '') {
            throw new Error('Content name must be filled!');
        }
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topicName, username, postText, date
            })
        })
        if (!response.ok) {
            throw new Error('Error')
        }
        const dataResponse = await response.json()
        form.reset()

        const divTopicNameWrapper = createElement('div', '', topicContainerDiv, { 'class': 'topic-name-wrapper' });
        const divTopicName = createElement('div', '', divTopicNameWrapper, { 'class': 'topic-name' });
        const anker = createElement('a', '', divTopicName, { 'class': 'normal', 'href': '#', 'data-id': dataResponse._id });
        anker.addEventListener('click', redirectToCurrentPost)
        createElement('h2', topicName, anker, {})
        const divColumns = createElement('div', '', divTopicName, { 'class': 'columns' });
        const cleanDiv = createElement('div', '', divColumns, {});
        const paragraphDate = createElement('p', 'Date', cleanDiv, {});
        createElement('time', dataResponse.date, paragraphDate, {});
        const divNickName = createElement('div', '', cleanDiv, { 'class': 'nick-name' });
        const paragraphUsername = createElement('p', 'Username: ', divNickName, {});
        createElement('span', username, paragraphUsername, {});
        topicContainerDiv.appendChild(divTopicNameWrapper);

    } catch (error) {
        alert(error.message);
    }

}

export function cancelTopic(e) {
    e.preventDefault();
    form.reset();
}

export async function loadTopics() {
   
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (!response.ok) {
            throw new Error('Error')
        }
        const dataResponse = await response.json();
        if(Object.keys(dataResponse).length === 0){
            return
        }
        topicContainerDiv.replaceChildren();
    
        for (const [id, topic] of Object.entries(dataResponse)) {
    
            const divTopicNameWrapper = createElement('div', '', topicContainerDiv, { 'class': 'topic-name-wrapper' });
            const divTopicName = createElement('div', '', divTopicNameWrapper, { 'class': 'topic-name' });
            const anker = createElement('a', '', divTopicName, { 'class': 'normal', 'href': '#', 'data-id': id });
            anker.addEventListener('click', redirectToCurrentPost)
            createElement('h2', topic.topicName, anker, {})
            const divColumns = createElement('div', '', divTopicName, { 'class': 'columns' });
            const cleanDiv = createElement('div', '', divColumns, {});
            const paragraphDate = createElement('p', 'Date', cleanDiv, {});
            createElement('time', topic.date, paragraphDate, {});
            const divNickName = createElement('div', '', cleanDiv, { 'class': 'nick-name' });
            const paragraphUsername = createElement('p', 'Username: ', divNickName, {});
            createElement('span', topic.username, paragraphUsername, {});
            topicContainerDiv.appendChild(divTopicNameWrapper);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export function redirectToCurrentPost(e) {
    window.location = './theme-content.html';
    const eventHandler = e.target.parentElement;
    localStorage.setItem('id',eventHandler.getAttribute('data-id'));    
}
