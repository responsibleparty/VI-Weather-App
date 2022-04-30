var submitButton = document.querySelector("#submitButton");
var searchField = document.querySelector("#searchField");
var statContainer = document.querySelector("#statContainer");
var openWeatherAPIKey = "dd30bd6b4179fbaa5f03952d07085a18";
var cityName;
var temperature;

function getCurrentWeather(location, lat, lon) {
  // & is a different parameter
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dd30bd6b4179fbaa5f03952d07085a18&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data); // Data is an object
      // console.log(data.name); // Retrieves Name from object
      // console.log(data.main.humidity);
      // console.log(data.main.temp);
      // console.log(data.wind.speed);
      var createName = document.createElement("h2"); //Create the element
      createName.textContent = data.name; // Gave element value
      statContainer.appendChild(createName);

      var iconURL = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      var icon = document.createElement("img");
      icon.setAttribute("src", iconURL);
      statContainer.appendChild(icon);

      var writeTemp = document.createElement("p");
      writeTemp.textContent = "Temperature: " + data.main.temp + " °F";
      statContainer.appendChild(writeTemp);

      var writeWind = document.createElement("p");
      writeWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
      statContainer.appendChild(writeWind);

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=dd30bd6b4179fbaa5f03952d07085a18&units=imperial`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          var writeUVI = document.createElement("p");
          writeUVI.textContent = "UV Index: " + data.current.uvi;
          statContainer.appendChild(writeUVI);

          for (i = 0; i <= 5; i++) {
            var htmlTemplate = document.createElement("ul");
            forecastContainer.appendChild(htmlTemplate);
          }
        });
    });
}

submitButton.addEventListener("click", function (event) {
  console.log(searchField.value);

  getCurrentWeather(searchField.value);
});

// Function that takes in lat and long
// Fetches new API
