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

function displayForecast() {
  let forecastElement = document.querySelector(".container");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="container">
        <div class="col date-forecast">
          <div class="weather-forecast-date">${day}</div>
          <span class="icon">☀️</span>
          <div class="weather-forecast">
            <span class="weather-forecast-max">18°</span>

            <span class="weather-forecast-min">13°</span>
          </div>
          <i class="fa-regular fa-eye fa-2xs eye-icon"></i>
        </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

searchCity("Tripoli");
displayForecast();
