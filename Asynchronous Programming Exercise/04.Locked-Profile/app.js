async function lockedProfile() {
    const main = document.getElementById('main');
    const firstTemplateUsername = document.querySelector('input[type="text"]');
    const firstTemplateEmail = document.querySelector('input[name="user1Email"]');
    const firstTemplateAge = document.querySelector('input[name="user1Age"]');


    try {
        //getting request and data
        const respond = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        const data = await respond.json();

        //adding info to the first profile
        firstTemplateUsername.value = Object.entries(data)[0][1].username;
        firstTemplateEmail.value = Object.entries(data)[0][1].email;
        firstTemplateAge.value = Object.entries(data)[0][1].age;
        document.querySelector('div[class="user1Username"]').style.display = 'none'

        //itterating through the data and creating profiles
        for (let i = 1; i < Object.entries(data).length; i++) {
            const [arr, obj] = Object.entries(data)[i]
            //creating main div 
            const mainDiv = document.createElement('div');
            mainDiv.className = 'profile';
            //creating image
            const img = document.createElement('img');
            img.src = "./iconProfile2.png";
            img.className = 'userIcon';
            //creating label lock
            const labelLock = document.createElement('label');
            labelLock.textContent = 'Lock';
            //creatin input lock
            const inputLock = document.createElement('input');
            inputLock.type = 'radio';
            inputLock.name = 'user1Locked';
            inputLock.value = 'lock';
            inputLock.checked;
            //creating label unlock
            const labelUnlock = document.createElement('label');
            labelUnlock.textContent = 'Unlock';
            //creatin input unlock
            const inputUnlock = document.createElement('input');
            inputUnlock.type = 'radio';
            inputUnlock.name = 'user1Locked';
            inputUnlock.value = 'unlock';
            //creating hr1
            const hr1 = document.createElement('hr');
            //creating label username
            const labelUsername = document.createElement('label');
            labelUsername.textContent = 'Username';
            //creatin input username
            const inputUsername = document.createElement('input');
            inputUsername.type = 'text';
            inputUsername.name = 'user1Username';
            inputUsername.value = `${obj.username}`;
            inputUsername.disabled = true;
            inputUsername.readOnly = true;
            //creating hiddenDiv and info for it
            const hiddenDiv = document.createElement('div');
            hiddenDiv.id = 'user1HiddenFields';
            hiddenDiv.style.display = 'none'
            const hr2 = document.createElement('hr');
            const labelEmail = document.createElement('label');
            labelEmail.textContent = 'Email:';
            const inputEmail = document.createElement('input');
            inputEmail.type = 'Email';
            inputEmail.name = 'user1Email';
            inputEmail.value = `${obj.email}`;
            inputEmail.disabled = true;
            inputEmail.readOnly = true;
            const labelAge = document.createElement('label');
            labelAge.textContent = 'Age:'
            const inputAge = document.createElement('input');
            inputAge.type = 'Email';
            inputAge.name = 'user1Age';
            inputAge.value = `${obj.age}`;
            inputAge.disabled = true;
            inputAge.readOnly = true;

            hiddenDiv.appendChild(hr2);
            hiddenDiv.appendChild(labelEmail);
            hiddenDiv.appendChild(inputEmail);
            hiddenDiv.appendChild(labelAge);
            hiddenDiv.appendChild(inputAge);
            //creating button 
            const button = document.createElement('button');
            button.textContent = 'Show more';
            //appending everything to main div
            mainDiv.appendChild(img);
            mainDiv.appendChild(labelLock);
            mainDiv.appendChild(inputLock);
            mainDiv.appendChild(labelUnlock);
            mainDiv.appendChild(inputUnlock);
            mainDiv.appendChild(hr1);
            mainDiv.appendChild(labelUsername);
            mainDiv.appendChild(inputUsername);
            mainDiv.appendChild(hiddenDiv);
            mainDiv.appendChild(button);
            main.appendChild(mainDiv);
        }


        const buttons = document.querySelectorAll('button')

        for (const btn of Array.from(buttons)) {
            btn.addEventListener('click', () => {
                const unlockIsCheked = btn.parentElement.querySelector('input[value="unlock"]');
                const hiddenInfo = btn.parentElement.querySelector('div');
                if (unlockIsCheked.checked) {
                    if (btn.textContent === 'Show more') {
                        hiddenInfo.style.display = 'block'
                        btn.textContent = 'Hide it';
                    } else {
                        hiddenInfo.style.display = 'none'
                        btn.textContent = 'Show more';
                    }
                }
            })
        }


    } catch (error) {

    }
}