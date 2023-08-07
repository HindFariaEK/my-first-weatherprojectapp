let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
console.log(now);

let months = [
  "January",
  "February",
  "Mars",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

function timeHour() {
  if (hour < 10) {
    hour = "0" + hour;
  } else {
    hour = hour + "";
  }
}

function timeMinutes() {
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes + "";
  }
}
timeHour();
timeMinutes();
let actualDate = document.querySelector(".today-date");
actualDate.innerHTML = `${month} ${date}, ${day} | ${hour} : ${minutes}`;

console.log(actualDate);

function lookforCity(event) {
  event.preventDefault();
  let inputsearch = document.querySelector("#searchBar");
  let cities = document.querySelector("#searchcity");
  cities.innerHTML = `${inputsearch.value}`;
}
let cityForm = document.querySelector("#form");
cityForm.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector(".container");

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDataDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 date-forecast text-center">
          <div class="weather-forecast-date">${formatDay(
            forecastDataDay.dt
          )}</div>
           <img
          src="http://openweathermap.org/img/wn/${
            forecastDataDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <div class="weather-forecast">
            <span class="weather-forecast-max">${Math.round(
              forecastDataDay.temp.max
            )}</span>

            <span class="weather-forecast-min">${Math.round(
              forecastDataDay.temp.min
            )}</span>
          </div>
          
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("#searchcity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar").value;

  searchCity(city);
}

function searchCity(city) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

searchCity("Libya");
