window.addEventListener('load', loadStudents);

const form = document.getElementById('form');
form.addEventListener('submit', createAndDisplay);

async function createAndDisplay(e) {
    e.preventDefault();
    const formData = new FormData(form)

    if (formData.get('firstName') == '' || formData.get('lastName') == '' || formData.get('facultyNumber') == '' || formData.get('grade') == '') {
        return;
    }
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const settings = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            facultyNumber: formData.get('facultyNumber'),
            grade: formData.get('grade')
        })
    }


    const response = await fetch(url, settings);
    await loadStudents()
}

async function loadStudents() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
    const response = await fetch(url);
    const data = await response.json()

    //creating tbody and clearing his html 
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (const [id, obj] of Object.entries(data)) {
        const tr = document.createElement('tr');
        //creating table th 
        const firstNameTd = document.createElement('td');
        const lastNameTd = document.createElement('td');
        const facNumTd = document.createElement('td');
        const gradeTd = document.createElement('td');

        firstNameTd.textContent = obj.firstName;
        lastNameTd.textContent = obj.lastName;
        facNumTd.textContent = obj.facultyNumber;
        gradeTd.textContent = obj.grade;

        tr.appendChild(firstNameTd);
        tr.appendChild(lastNameTd);
        tr.appendChild(facNumTd);
        tr.appendChild(gradeTd);

        tbody.appendChild(tr);
    }
}