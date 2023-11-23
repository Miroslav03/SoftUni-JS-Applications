const loadBooksBtn = document.getElementById('loadBooks');
loadBooksBtn.addEventListener('click', loadBooks);

const form = document.querySelector('form');
form.addEventListener('submit', submit)

const btnEdit = document.getElementById('edit')
btnEdit.addEventListener('click', editBook)


const tbody = document.querySelector('tbody');

function createElement(key, object) {
    const tr = `<tr>
    <td id =${key}2>${object.title}</td>
    <td id =${key}3>${object.author}</td>
    <td>
        <button id =${key} data-id="${key}">Edit</button>
        <button id =${key}1 data-id="${key}">Delete</button>
    </td>
</tr>`
    return tr
}

async function loadBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const response = await fetch(url);
    const data = await response.json();
    const result = Object.entries(data).map(([key, obj]) => createElement(key, obj))
    tbody.innerHTML = '';
    for (const el of result) {
        tbody.innerHTML += el
    }
    const deleteBtns = Array.from(document.querySelectorAll('button'))
        .filter((btn) => btn.textContent === 'Delete')
        .map((btn) => btn.addEventListener('click', deleteBook));
    const EditBtns = Array.from(document.querySelectorAll('button'))
        .filter((btn) => btn.textContent === 'Edit')
        .map((btn) => btn.addEventListener('click', editBtn1));
}

async function submit(e) {
    e.preventDefault()
    const data = new FormData(form)
    if (data.get('author') == '' || data.get('title') == '') {
        return;
    }
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const settings = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: data.get('author'),
            title: data.get('title'),
        })
    }
    const response = await fetch(url, settings);
    const getResponse = await fetch(url)
    const lastGotElement = await getResponse.json()
    const [key, obj] = Object.entries(lastGotElement).find(([id, obj]) => obj.title === data.get('title') && obj.author === data.get('author'))
    tbody.innerHTML += createElement(key, obj)

    const editBtn = document.getElementById(`${key}`)
    editBtn.addEventListener('click', editBtn1)
    const deleteBtn = document.getElementById(`${key}1`)
    deleteBtn.addEventListener('click', deleteBook)

    document.getElementById('titleInput').value = ''
    document.getElementById('authorInput').value = ''
}

async function deleteBook(e) {
    const id = e.target.dataset.id
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const settings = {
        method: 'delete'
    }
    const response = await fetch(url, settings)
    e.target.parentElement.parentElement.remove()
}

let currentId = ''
async function editBtn1(e) {
    const id = e.target.dataset.id
    currentId = id
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id)
    const data = await response.json()
    document.getElementById('titleInput').value = data.title
    document.getElementById('authorInput').value = data.author
}

async function editBook() {

    const title = document.getElementById('titleInput')
    const author = document.getElementById('authorInput')
    if (author.value == '' || title.value == '') {
        return;
    }

    document.getElementById(`${currentId}2`).textContent =  title.value 
    document.getElementById(`${currentId}3`).textContent =  author.value 
    document.getElementById('titleInput').value = ''
    document.getElementById('authorInput').value = ''
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${currentId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: author.value,
            title: title.value
        })  
    })
    
}