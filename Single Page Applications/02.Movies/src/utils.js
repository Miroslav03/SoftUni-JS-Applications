export function showCurrentSection(section) {
    //hide all sections
    document.querySelectorAll('section').forEach((section) => section.style.display = 'none');
    //display current section
    section.style.display = 'block';
}

export function updateNavigation() {

    const welcomeMsg = document.getElementById('welcome-msg');
    const user = localStorage.getItem('user');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.querySelectorAll('li[class="nav-item user"]').forEach((nav) => nav.style.display = 'block')
        document.querySelectorAll('li[class="nav-item guest"]').forEach((nav) => nav.style.display = 'none')
        welcomeMsg.textContent = `Welcome ${userData.email}`
    } else {
        //hide user navigation view
        document.querySelectorAll('li[class="nav-item user"]').forEach((nav) => nav.style.display = 'none')
        //show guest navigation view
        document.querySelectorAll('li[class="nav-item guest"]').forEach((nav) => nav.style.display = 'block')
    }
}