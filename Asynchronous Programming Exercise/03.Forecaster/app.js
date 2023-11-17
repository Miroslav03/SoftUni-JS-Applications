function attachEvents() {
    const btn = document.getElementById('submit');
    btn.addEventListener('click', getData);
    const icons = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176',
    }
    async function getData() {
        const input = document.getElementById('location').value;
        const url = `http://localhost:3030/jsonstore/forecaster/locations`

        try {
            const response = await fetch(url);
            const dataArr = await response.json();
            if (!response.ok) {
                throw new Error()
            }

            let name = '';
            let code = '';

            const index = dataArr.findIndex(obj => obj.name === input)
            if (index === -1) {
                throw new Error()
            } else {
                name = dataArr[index].name;
                code = dataArr[index].code;
                document.getElementById('forecast').style.display = 'block'
            }

            const secondResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
            const data = await secondResponse.json()

            const current = document.getElementById('current');
            //creating div forecast
            const div = document.createElement('div');
            div.className = 'forecasts';
            //creaating span condition symbol
            const spanSymbol = document.createElement('span');
            spanSymbol.className = 'condition symbol';
            spanSymbol.innerHTML = icons[data.forecast.condition]
            //creating span condition
            const spanCondition = document.createElement('span');
            spanCondition.className = 'condition';
            //creating span condition three spans name/degrees/conditions
            const spanNameCity = document.createElement('span');
            const spanDegrees = document.createElement('span');
            const currentWetherSpan = document.createElement('span');

            spanNameCity.className = 'forecast-data';
            spanDegrees.className = 'forecast-data';
            currentWetherSpan.className = 'forecast-data';

            spanNameCity.textContent = data.name;
            spanDegrees.innerHTML = `${data.forecast.low}${icons.Degrees}/${data.forecast.high}${icons.Degrees}`;
            currentWetherSpan.textContent = data.forecast.condition;

            //appending everything to div
            spanCondition.appendChild(spanNameCity);
            spanCondition.appendChild(spanDegrees);
            spanCondition.appendChild(currentWetherSpan);

            div.appendChild(spanSymbol);
            div.appendChild(spanCondition);

            current.append(div)

            //3-day forecast
            // request
            const thirdResponese = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            const secondData = await thirdResponese.json();
            //creatingElements
            const upcoming = document.getElementById('upcoming');
            //div
            const forecastInfoDiv = document.createElement('div');
            forecastInfoDiv.className = 'forecast-info'
            //for of secondData elements
            console.log(secondData);
            for (const obj of secondData.forecast) {
                //span class upcoming
                const spanUpcoming = document.createElement('span');
                spanUpcoming.className = 'upcoming'
                //symbol
                const spanSymbol = document.createElement('span');
                spanSymbol.className = 'symbol';
                spanSymbol.innerHTML = icons[obj.condition]
                //degreese
                const spanDegrees = document.createElement('span');
                spanDegrees.className = 'forecast-data';
                spanDegrees.innerHTML = `${obj.low}${icons.Degrees}/${obj.high}${icons.Degrees}`
                //wetherDescription
                const currentWetherSpan = document.createElement('span');
                currentWetherSpan.className = 'forecast-data';
                currentWetherSpan.textContent = obj.condition;

                spanUpcoming.appendChild(spanSymbol);
                spanUpcoming.appendChild(spanDegrees);
                spanUpcoming.appendChild(currentWetherSpan);
                forecastInfoDiv.appendChild(spanUpcoming);
            }
            upcoming.appendChild(forecastInfoDiv);

        } catch (error) {
            document.getElementById('forecast').textContent = 'Error'

        }
    }
}

attachEvents();