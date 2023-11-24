import { cancelTopic, loadTopics, postTopic, redirectToCurrentPost } from "./home.js";

window.addEventListener('DOMContentLoaded', loadTopics);

const homeBtn = document.querySelector('a');
homeBtn.addEventListener('click', loadTopics);

const buttonPost = document.querySelector('button[class="public"]');
buttonPost.addEventListener('click', postTopic);

const btnCancle = document.querySelector('button[class="cancel"]');
btnCancle.addEventListener('click', cancelTopic);

