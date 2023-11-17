async function getInfo() {
    const input = document.getElementById('stopId').value;
    const nameOfStop = document.getElementById('stopName');
    const buses = document.getElementById('buses');
    buses.textContent = ''
    const url = `http://localhost:3030/jsonstore/bus/businfo/${input}`;

    try {
        const response = await fetch(url);
        if(response.ok === false){
            throw new Error;
        }
        const data = await response.json();
        nameOfStop.textContent = data.name;
        for (const [busId, minutes] of Object.entries(data.buses)) {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${minutes} minutes`;
            buses.appendChild(li);
        }

    } catch (error) {
        nameOfStop.textContent = 'Error'
    }

}