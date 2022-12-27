const body = document.querySelector("body");
const form = document.querySelector("form");
const cityInput = document.querySelector("input");
const key = "2de5b844dab837e086d06711fdd2338a";
const statusList = document.querySelector(".status-list");
const leftInfo = document.querySelector(".left-info");
let Time = document.querySelector(".Time");

setInterval(() => {
  Time.textContent = new Date().toLocaleTimeString();
}, 1000);

/////FETCH DATA

const fetchData = async (cName) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cName}&appid=${key}`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Could not fetch Data");
      }
      return res.json();
    })
    .then((data) => {
      RenderUI(data);
      console.log(data.weather[0].main);
      console.log(data.weather[0].description);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};

// let cityName = null;
let cityName = "Islamabad";
fetchData(cityName);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = cityInput.value.trim();
  try {
    if (cityName === "") {
      throw "Please Enter City Name";
    } else {
      console.log(cityName);
      fetchData(cityName);
    }
  } catch (err) {
    console.log(err);
    alert(err);
    return;
  }
});

/////Setting_UI
const RenderUI = (data) => {
  /////setting BAckground
  body.style.background = `url("/assest/img/${data.weather[0].main}.jpg") center center / cover no-repeat`;

  let country;
  data.sys.country ? (country = data.sys.country) : (country = "--");
  statusList.innerHTML = `
  <li>
  <p>Country</p>
  <p class="country white">${country}</p>
</li>
<li>
  <p>Humidity</p>
  <p class="humidity white">${data.main.humidity}%</p>
</li>
<li>
  <p>Wind</p>
  <p class="wind white">${parseInt(data.wind.speed)}km/h</p>
</li>
<li>
  <p>Feels Like</p>
  <p class="feels-like white">${parseInt(data.main.feels_like - 273.15)}°</p>
</li>
  `;
  leftInfo.innerHTML = `
  <h1>${parseInt(data.main.temp - 273.15)}°</h1>
  <div class="location-info">
    <h3>${data.name}</h3>    
  <p>
  ${new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  })}
  </p>
  </div>
  <div class="weather-status">
    <p>${data.weather[0].main}</p>
  </div>
    `;
};

// [
//     "Sunrise",
//     "Sunset",
//     "Clear",
//     "Partly cloudy",
//     "Dust",
//     "Haze",
//     "Smoke",
//     "Fog",
//     "Windy",
//     "Cloudy",
//     "Thunderstorms",
//     "Rain",
//     "Heavy rain",
//     "Drizzle",
//     "Hail",
//     "Tornado",
//     "Snow",
//     "Scattered snow",
//     "Heavy snow/Sleet",
//     "Blowing snow",
//     "Cloudy",
//     "Clear"
// ]
