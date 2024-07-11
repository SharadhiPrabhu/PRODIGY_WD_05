const apiKey = 'e8855d3e8c674e328ce55414240707';  // Replace 'YOUR_API_KEY' with your actual API key
const form = document.getElementById('locationForm');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const locationInput = document.getElementById('locationInput').value;
    getWeather(locationInput);
});

async function getWeather(location) {
    try {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const weatherData = await response.json();
        
        const { location: { name }, current: { temp_c, humidity, condition: { text } } } = weatherData;
        
        weatherInfo.innerHTML = `
            <h2>Current Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${temp_c}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Description:</strong> ${text}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}
