let userData = null;
window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'))

    document.querySelector('span').textContent = userData.username

    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('.add').disabled = false;
        document.getElementById('logout').addEventListener('click', async () => {

            const response = await fetch('http://localhost:3030/users/logout');
        })

    } else {
        document.getElementById('guest').style.display = 'block'
        document.querySelector('.add').disabled = true;
    }

    document.querySelector('.load').addEventListener('click', loadCatches)

    document.getElementById('addForm').addEventListener('submit', addNewCatch)

})

async function addNewCatch(event) {
    event.preventDefault();
    
    if(!userData){
        window.location.assign('./login.html')
        return
    }

    const data = new FormData(event.target);

    const obj = [...data.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {})
   
    try {
        if(Object.values(obj).some(x => x == '')){
            throw new Error('All fields must be filled!')
        }
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body:JSON.stringify(obj)
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        event.target.reset()
        loadCatches()
    } catch (error) {
        alert(error.message)
    }
}

async function loadCatches(event) {
    const response = await fetch('http://localhost:3030/data/catches')
    const data = await response.json()

    document.getElementById('catches').replaceChildren(...data.map(createCatchPost));

}
function createCatchPost(obj) {
    let isUser = userData && obj._ownerId === userData.id
    console.log(obj._id);
    const div = document.createElement('div');
    div.className = 'catch'
    div.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${obj.angler}" ${!isUser ? 'disabled' : ''}>
    <label>Weight</label>
    <input type="text" class="weight" value="${obj.weight}" ${!isUser ? 'disabled' : ''}>
    <label>Species</label>
    <input type="text" class="species" value="${obj.species}" ${!isUser ? 'disabled' : ''}>
    <label>Location</label>
    <input type="text" class="location" value="${obj.location}" ${!isUser ? 'disabled' : ''}>
    <label>Bait</label>
    <input type="text" class="bait" value="${obj.bait}" ${!isUser ? 'disabled' : ''}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${obj.captureTime}" ${!isUser ? 'disabled' : ''}>
    <button class="update" data-id="${obj._id}" ${!isUser ? 'disabled' : ''}>Update</button>
    <button class="delete" data-id="${obj._id}" ${!isUser ? 'disabled' : ''}>Delete</button>`

    return div;
}

