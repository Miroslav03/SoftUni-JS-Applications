async function solution() {
    try {
        const main = document.getElementById('main');

        const nameResponse = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
        const nameaData = await nameResponse.json()


        for (const obj of nameaData) {
            const accordeonDiv = document.createElement('div');
            accordeonDiv.className = 'accordion'
            const textResponse = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${obj._id}`);
            const textData = await textResponse.json()
            console.log(textData);
            const text = `
            <div class="head">
                <span>${obj.title}</span>
                <button class="button" id="${obj._id}">More</button>
            </div>
            <div class="extra">
                <p>${textData.content}</p>
            </div>`;

            accordeonDiv.innerHTML += text
            main.appendChild(accordeonDiv)
        }

        const buttons = document.querySelectorAll('button');

        for (const button of buttons) {
            const mainDiv = button.parentElement.parentElement;
            const hiddenDiv = Array.from(mainDiv.querySelectorAll('div'))
            button.addEventListener('click', () => {
                if (button.textContent === 'More') {
                    hiddenDiv[1].style.display = 'block'
                    button.textContent = 'Less'
                } else {
                    hiddenDiv[1].style.display = 'none'
                    button.textContent = 'More'
                }
            })
        }

    } catch (error) {
        console.error(error.message)
    }

}
solution()    
