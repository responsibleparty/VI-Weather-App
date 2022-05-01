var submitButton = document.querySelector("#submitButton");
var searchField = document.querySelector("#searchField");
var statContainer = document.querySelector("#statContainer");
var appendCities = document.querySelector("#appendCities");
var forecastContainer = document.querySelector("#forecastContainer");
var openWeatherAPIKey = "dd30bd6b4179fbaa5f03952d07085a18";
var cityName;
var temperature;
var listOfCities = [];

function initiate(){
  if (localStorage.getItem("savedCity")){
    listOfCities = JSON.parse(localStorage.getItem("savedCity"))
  }
  for (let city of listOfCities){
    appendCities.innerHTML += `<button>${city}</button`;
  }
}

initiate();

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

      statContainer.innerHTML = "";

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
        .then((forecast) => {
          console.log(forecast);

          var writeUVI = document.createElement("p");
          writeUVI.textContent = "UV Index: " + forecast.current.uvi;
          statContainer.appendChild(writeUVI);
          display5Forecast(forecast);
        });

        if(!duplicateCheck(data.name)){
          return;
        }
        saveToLocal(data.name);
        appendCities.innerHTML += `<button>${searchField.value}</button`;

    });
};

submitButton.addEventListener("click", function (event) {
  console.log(searchField.value);

  getCurrentWeather(searchField.value);
});

function saveToLocal(city){
  listOfCities.push(city);
  localStorage.setItem("savedCity", JSON.stringify(listOfCities));
  console.log(city);
}

function duplicateCheck(city){
  for (var i=0; i <listOfCities.length; i++){
    if (listOfCities[i].toLowerCase() === city.toLowerCase()){
      return false;
    } 
  } return true;
}

function display5Forecast(moreData){
  forecastContainer.innerHTML = "";
  for (var i=0; i <5; i++){
    var unixCode = new Date(moreData.daily[i].dt * 1000); //Generates the date in unixcode * 1000 milliseconds
    var theDate = unixCode.toDateString();
    forecastContainer.innerHTML += `<div class="forecast-card">
                                    <h4>${theDate}</h4>
                                    <img src="https://openweathermap.org/img/w/${moreData.daily[i].weather[0].icon}.png">
                                    <h3>${moreData.daily[i].temp.day}</h3>
                                    <h3>${moreData.daily[i].humidity}</h3>
                                    </div>`
  }
}

// Function that takes in lat and long
// Fetches new API
