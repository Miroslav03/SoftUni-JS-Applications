function attachEvents() {
    const ul = document.getElementById('phonebook');

    const btnLoad = document.getElementById('btnLoad');
    btnLoad.addEventListener('click', loadData)

    const btnCreate = document.getElementById('btnCreate');
    btnCreate.addEventListener('click', createPhone)

    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');


    async function loadData() {
        const url = 'http://localhost:3030/jsonstore/phonebook';

        const response = await fetch('http://localhost:3030/jsonstore/phonebook');
        const data = await response.json();
        for (const [key, obj] of Object.entries(data)) {
            const li = document.createElement('li');
            li.textContent = `${obj.person}: ${obj.phone}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.dataset.id = key;
            li.appendChild(deleteBtn);
            ul.appendChild(li);

            deleteBtn.addEventListener('click', deletePhone);

            async function deletePhone(e) {
                const id = e.target.dataset.id;
                const deleteUrl = `http://localhost:3030/jsonstore/phonebook/${id}`;

                const settings = {
                    method: 'Delete',
                }
                const response = await fetch(deleteUrl, settings);
                deleteBtn.parentElement.remove()

            }
        }
    }

    async function createPhone() {
        const url = 'http://localhost:3030/jsonstore/phonebook';
        const settings = {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                person: personInput.value,
                phone: phoneInput.value
            }
            )
        }
        if (!personInput.value || !phoneInput.value) {
            return;
        }
        const response = await fetch(url, settings);
        personInput.value = '';
        phoneInput.value = '';
        ul.innerHTML = '';
        await loadData();
    }
}

attachEvents();