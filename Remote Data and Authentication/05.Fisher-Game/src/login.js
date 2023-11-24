window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', submitData);
    document.getElementById('logout').style.display = 'none';
})

async function submitData(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const email = data.get('email');
    const password = data.get('password');


    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password
            })
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        const responseData = await response.json()
        const data = responseData.accessToken;
        console.log(responseData);
        const userData = {
            username: responseData.username,
            email: responseData.email,
            id: responseData._id,
            token: data
        }

        sessionStorage.setItem('userData', JSON.stringify(userData))
        window.location.assign('./index.html')

    } catch (error) {
        alert(error.message)
    }
}