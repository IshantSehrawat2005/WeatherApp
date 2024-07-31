document.getElementById('search-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
        document.getElementById('location-input').value = ''; // Clear the input field after search
    }
});

function fetchWeather(location) {
    const apiKey = '781feef8141294bf73ef2ac660103f64';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
        <div class="weather-details-container">
            <div class="weather-item">
                <i class="fas fa-map-marker-alt weather-icon"></i>
                <h3>Location</h3>
                <p>${data.name}</p>
            </div>
            <div class="weather-item">
                <i class="fas fa-thermometer-half weather-icon"></i>
                <h3>Temperature</h3>
                <p>${data.main.temp} °C</p>
            </div>
            <div class="weather-item">
                <i class="fas fa-cloud weather-icon"></i>
                <h3>Weather</h3>
                <p>${data.weather[0].description}</p>
            </div>
            <div class="weather-item">
                <i class="fas fa-tint weather-icon"></i>
                <h3>Humidity</h3>
                <p>${data.main.humidity}%</p>
            </div>
        </div>
    `;

    weatherDetails.classList.remove('hidden');
    weatherDetails.style.display = 'block';
}
