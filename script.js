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

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid location');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
                errorMessage.classList.add('hidden'); 
            })
            .catch(error => {
                errorMessage.textContent = 'Location not found. Please try again.';
                errorMessage.classList.remove('hidden');
                document.getElementById('weather-details').style.display = 'none'; // Hide weather details
            });

        document.getElementById('location-input').value = ''; // Clear the input field after search
    }
}

function displayWeather(data) {
    const weatherDetails = document.getElementById('weather-details');
    const weatherIcon = getWeatherIcon(data.weather[0].main); // Get appropriate icon based on weather condition
    weatherDetails.innerHTML = `
        <div class="weather-details-container">
            <div class="weather-item">
                <i class="${weatherIcon} weather-icon"></i>
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

function getWeatherIcon(condition) {
    switch (condition) {
        case 'Clear':
            return 'fas fa-sun'; // Sunny icon
        case 'Clouds':
            return 'fas fa-cloud'; // Cloudy icon
        case 'Rain':
            return 'fas fa-cloud-showers-heavy'; // Rainy icon
        case 'Snow':
            return 'fas fa-snowflake'; // Snowy icon
        case 'Thunderstorm':
            return 'fas fa-bolt'; // Thunderstorm icon
        case 'Drizzle':
            return 'fas fa-cloud-rain'; // Drizzle icon
        default:
            return 'fas fa-smog'; // Default icon
    }
}
