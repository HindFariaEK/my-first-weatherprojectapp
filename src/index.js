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

function showWeather(response) {
  document.querySelector("#searchcity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
}
function search(event) {
  event.preventDefault();
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let city = document.querySelector("#searchBar").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
