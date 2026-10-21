// select html Elements
const apiKey =  "e4904da62b97a032a5d8cac0847c3454";

const inputElement = document.querySelector("#inputElement");
const searchButton = document.querySelector("#searchButton");
const weatherCondition = document.querySelector(".weathe-condition p");
const currTemperature = document.querySelector(".temperature h1");
const cityName = document.querySelector(".city-name p");
const windSpeed = document.querySelector(".wind-speed p");
const humidity  = document.querySelector(".humidity h3");
const weatherIcon = document.querySelector("img");
const modal = document.querySelector(".modal");

searchButton.addEventListener("click", () => {
  const inputValue = inputElement.value;
  const trimValue = inputValue.trim();

  if (trimValue === "") {
    console.log("Please enter a city name");
    return;
  }

  // Use encodeURIComponent to handle spaces and special characters safely
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimValue)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      // Check if the API returned a 404 or other error
      if (!response.ok) {
         modal.style.display = "flex";
        throw new Error (`City not found (Status: ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
    
     modal.style.display = "none";
      weatherCondition.textContent = data.weather[0].description;

      if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
      }
    
      else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
      }
      else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
      }
      else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
      }
      else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png"
      }
      else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "images/strom.png"
      }
        else{
        weatherIcon.src = "images/clear.png"
        }

        
      currTemperature.textContent = Math.round(data.main.temp) + "°C" ;
      cityName.textContent = data.name;
      windSpeed.textContent = data.wind.speed + `${"m/s"}`;
      humidity.textContent = data.main.humidity + `${"%"}`;
    
    })
      .catch(err => {
   modal.style.display = "flex";
  // modal.innerText = "Something went wrong. Please try again.";
  // modal.style.color = "red";

});
  });
  

 





