document.getElementById('search-btn').addEventListener('click', function() {
    fetchWeather();
});

document.getElementById('location-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const location = document.getElementById('location-input').value;
    const errorMessage = document.getElementById('error-message');
    if (location) {
        const apiKey = '781feef8141294bf73ef2ac660103f64';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        // Hide the error message if present
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    showError('Invalid location. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                showError('An error occurred. Please try again.');
            });

        document.getElementById('location-input').value = ''; // Clear the input field after search
    }
}

function displayWeather(data) {
    const weatherDetails = document.getElementById('weather-details');
    const weatherIcon = getWeatherIcon(data.weather[0].main);
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
                <i class="${weatherIcon} weather-icon"></i>
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

function getWeatherIcon(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            return 'fas fa-sun';
        case 'clouds':
            return 'fas fa-cloud';
        case 'rain':
            return 'fas fa-cloud-showers-heavy';
        case 'drizzle':
            return 'fas fa-cloud-rain';
        case 'thunderstorm':
            return 'fas fa-bolt';
        case 'snow':
            return 'fas fa-snowflake';
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            return 'fas fa-smog';
        default:
            return 'fas fa-cloud';
    }
}

function showError(message) {
    let errorMessage = document.getElementById('error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.marginTop = '20px';
        document.querySelector('.container').appendChild(errorMessage);
    }
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
