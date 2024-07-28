const apiKey = "e8855d3e8c674e328ce55414240707";
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
	try{
    const response = await fetch(`${apiUrl}${city}`);
    if (!response.ok) {
         throw new Error("Failed to fetch");
	}
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°c";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr";

        switch (data.current.condition.text) {
            case "Cloud":
                weatherIcon.src = "cloud.jpg";
                break;
            case "Clear":
                weatherIcon.src = "clear.jpg";
                break;
            case "Rain":
                weatherIcon.src = "rain.jpg";
                break;
            case "Drizzle":
                weatherIcon.src = "drizzle.jpg";
                break;
            case "Mist":
                weatherIcon.src = "mist.jpg";
                break;
			case "Snow":
                weatherIcon.src = "snow.jpg";
                break;
			case "Thunderstorm":
                weatherIcon.src = "thunderstorm.jpg";
                break;
			case "Haze":
                weatherIcon.src = "haze.jpg";
                break;
            
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
});