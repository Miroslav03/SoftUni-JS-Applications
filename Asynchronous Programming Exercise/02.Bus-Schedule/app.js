function solve() {
    const info = document.querySelector('span');
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');

    let departId = 'depot';
    let departName;

    async function depart() {
        try {
            const request = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${departId}`)
            if (request.ok == false) {
                throw new Error;
            }
            const data = await request.json();
            console.log(data);
            departId = data.next;
            departName = data.name;
            info.textContent = `Next stop ${departName}`
            btnDepart.disabled = true;
            btnArrive.disabled = false;

        } catch (error) {
            info.textContent = 'Error';
            btnDepart.disabled = true;
            btnArrive.disabled = true;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${departName}`
        btnDepart.disabled = false;
        btnArrive.disabled = true;
       
    }

    return {
        depart,
        arrive
    };
}

let result = solve();