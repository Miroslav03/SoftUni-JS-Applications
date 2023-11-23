function attachEvents() {
    const textArea = document.getElementById('messages');

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', submit);

    const refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', display);
    

    let nameInput = document.querySelector('input[name="author"]');
    let contentInput = document.querySelector('input[name="content"]');


    async function submit(e) {
        e.preventDefault();
        const url = `http://localhost:3030/jsonstore/messenger`;
        if (nameInput.value == '' || contentInput.value == '') {
            return
        }
        const settings = {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: nameInput.value.trim(),
                content: contentInput.value.trim(),
            }
            )
        }
        const response = await fetch(url, settings);
        const data = await response.json();
    }
    
    async function display(){
        const url = `http://localhost:3030/jsonstore/messenger`;        
        const response = await fetch(url);
        const data = await response.json();
        const comments = [];
        for (const [key,obj] of Object.entries(data)) {
            comments.push(`${obj.author}: ${obj.content}`)
        }
        textArea.textContent = comments.join('\n');
    }
}

attachEvents();