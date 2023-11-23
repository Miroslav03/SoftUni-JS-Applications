window.addEventListener('DOMContentLoaded',() =>{
    const form = document.querySelector('form');
    form.addEventListener('submit',register);
    document.getElementById('logout').style.display = 'none';

})

async function register(event){
    event.preventDefault();
    
    const data = new FormData(event.target);
    
    const rePass = data.get('rePass')
    const email  = data.get('email');
    const password  = data.get('password');

    
    try {
        const response = await fetch('http://localhost:3030/users/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email,password,rePass
            })
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        if(rePass != password){
            throw new Error('Passwords need to match');
        }

        const data = await response.json();
        const token = data.accessToken;
        const userData = {
            username:data.username,
            email:data.email,
            id:data._id,
            token
        }
        sessionStorage.setItem('UserData',JSON.stringify(userData));
        window.location.assign('./index.html')
        
    } catch (error) {
        alert(error.message)
    }

}