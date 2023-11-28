export function initializer(locations) {
    const nav = document.querySelector('nav');
    nav.addEventListener('click', direct);

    const main = document.getElementById('root');


    function showSection(section) {
        main.replaceChildren(section);
    }

    function direct(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === "A") {
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }

    function goTo(path,...params) {
        const show = locations[path];
        show(context,...params);
    }

    function updateNaviagtion(){
        const user = sessionStorage.getItem('user');
        if(user){
            document.querySelectorAll('a[id="user"]').forEach(a => a.style.display = 'block');
            document.querySelectorAll('a[id="guest"]').forEach(a => a.style.display = 'none');
        }else {
            document.querySelectorAll('a[id="user"]').forEach(a => a.style.display = 'none');
            document.querySelectorAll('a[id="guest"]').forEach(a => a.style.display = 'block');
        }
    }

    const context = {
        showSection,
        goTo,
        updateNaviagtion
    }

    return context;
}