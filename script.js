const cityNam = "bareilly";
let formattedTime;
const url = `https://worldtimeapi.org/api/timezone/${encodeURIComponent(
      cityNam
)}`;
fetch(url)
      .then((response) => {
            if (!response.ok) {
                  throw new Error(
                        `HTTP error! Status: ${response.status}, Response: ${response.statusText}`
                  );
            }
            return response.json();
      })
      .then((data) => {
            console.log(`Time zone of ${cityNam}:`, data.timezone);
      })
      .catch((error) => {
            console.error("Error:", error);
      });

function convertToDate(dateInput, index) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateInput)) {
            console.error(
                  "Please enter a valid date in the format yyyy-mm-dd."
            );
            return null;
      }
      const selectedDate = new Date(dateInput);
      if (index === 0) {
            const dayOfWeek = selectedDate.getDay();
            const daysOfWeek = [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thr",
                  "Fri",
                  "Sat",
            ];
            const date = selectedDate.getDate();
            const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
            ];
            const month = selectedDate.getMonth();
            return `${daysOfWeek[dayOfWeek]},${months[month]} ${date}`;
      } else {
            const dayOfWeek = selectedDate.getDay();
            const daysOfWeek = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
            ];
            return `${daysOfWeek[dayOfWeek]}`;
      }
}

const API_KEY = "811cbc5e69f7da32d785f312380a4be0";
let textInput = document.getElementById("textInput");
textInput.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
            getlocation();
      }
});

const weathercard = document.querySelector(".card");
const currentweather = document.querySelector(".current");

function getlocation() {
      const cityname = textInput.value.trim();
      console.log(cityname);
      const city = document.getElementById("city");
      city.innerText = cityname.toUpperCase();
      if (!cityname) return;
      const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${API_KEY}`;
      fetch(GEOCODING_API_URL)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  if (!data.length) return (alert = "CITY NOT FOUND");
                  const { name, lat, lon } = data[0];
                  getWeatherDetails(name, lat, lon);
            })
            .catch(() => {
                  alert("An error occurred while fetching the API");
            });
}
function getWeatherDetails(name, lat, lon) {
      const latitude = lat;
      const longitude = lon;
      const apiKey = "BNAMB6BML8ZH";
      const timestamp = Math.floor(Date.now() / 1000);
      const apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
      fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                  if (data.status === "OK") {
                        const offsetInSeconds = data.gmtOffset;
                        // Subtract 5 hours and 30 minutes from the local time due to api scenario
                        const localTime = new Date(
                              timestamp * 1000 + offsetInSeconds * 1000
                        );
                        localTime.setHours(localTime.getHours() - 5);
                        localTime.setMinutes(localTime.getMinutes() - 30);
                        // Convert to 24-hour format
                        formattedTime = localTime.toLocaleTimeString("en-US", {
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit",
                        });
                        const time = document.getElementById("time");
                        time.innerHTML = formattedTime;
                  } else {
                        console.error(
                              "Failed to get time zone data:",
                              data.message
                        );
                  }
            })
            .catch((error) => console.error("Error fetching data:", error));

      const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const createWeatherCard = (weatherItem, index, formattedTime) => {
            const dt = weatherItem.dt_txt.split(" ")[0];
            const re = convertToDate(dt, index);
            if (index === 0) {
                  let inputString = weatherItem.weather[0].main;
                  let inputString1 = weatherItem.weather[0].description;
                  let wcard5 = document.getElementById("wcard5");
                  let wcard1 = document.getElementById("wcard1");
                  let wcard2 = document.getElementById("wcard2");
                  let wcard3 = document.getElementById("wcard3");
                  let wcard4 = document.getElementById("wcard4");
                  
                  console.log(inputString);
                  let videoPath1 = "cloud_-_48501 (Original).mp4";
                  let videoPath2 = "leaves_-_74233 (1080p).mp4";
                  let videoPath3 = "stockfootage0154.mp4";
                  let videoPath4 = "black_and_white_-_16445 (1080p).mp4";
                  let videoElement =
                        document.getElementById("video-background");
                  if (inputString1 === "few clouds") {
                        videoElement.src = videoPath1;
                  } else if (inputString === "Rain") {
                        videoElement.src = videoPath2;
                        // wcard1.style.background='linear-gradient(to right, #ff8a00, #da1b60)';
                  } else if (inputString === "Clear") {
                        videoElement.src = videoPath3;
                  } else if (inputString === "Clouds") {
                        videoElement.src = videoPath4;
                  }
                  // Reload the video to apply the source change
                  videoElement.load();
                  return `<div class="flex ml-5">
                  <h1 class="text-9xl">${(
                        weatherItem.main.temp - 273.15
                  ).toFixed(0)}</h1>
                  <p class="text-5xl font-bold">o</p>
            </div>
            <div>
                  <div
                        id="time"
                        class="text-5xl font-bold"
                  >
                        00:00
                  </div>
                  <div
                        id="date"
                        class="text-2xl font-bold"
                  >
                  ${re}
                  </div>
            </div>
            <div class="mr-7 flex flex-col  items-center">
                  <img
                        class="w-32 h-32  mt-[-25px]"
                        src="https://openweathermap.org/img/wn/${
                              weatherItem.weather[0].icon
                        }@2x.png"
                        alt="a"
                  />
                  <p class="font-bold text-2xl mt-[-20px] ">${
                        weatherItem.weather[0].description
                  }</p>
            </div>`;
            }
            return `<div
            class="cards font-bold h-32 w-28 rounded-lg  bg-opacity-0-70"
      >
            <div class="cd flex flex-col justify-center items-center">
            <p class="text-sm">${re}</p>
            <div class="flex flex-col justify-center items-center">
                  <img class="w-14" src="https://openweathermap.org/img/wn/${
                        weatherItem.weather[0].icon
                  }@2x.png" alt="" />
                  <p>${weatherItem.weather[0].main}</p>
            </div>
            <p>${(weatherItem.main.temp - 273.15).toFixed(1)}°C</p>
      </div>
      </div>`;
      };
      fetch(WEATHER_API_URL)
            .then((res) => res.json())
            .then((data) => {
                  const uniqueForecastDays = [];
                  let firstForecastDateTime = null;
                  // Filter the forecasts to get one forecast per day with the same time
                  const fiveDaysForecast = data.list.filter((forecast) => {
                        const forecastDateTime = new Date(forecast.dt_txt);
                        // If it's the first forecast, store the date and time
                        if (!firstForecastDateTime) {
                              firstForecastDateTime = forecastDateTime;
                              return true;
                        }
                        // Check if the current forecast has the same time as the first forecast
                        if (
                              forecastDateTime.getHours() ===
                                    firstForecastDateTime.getHours() &&
                              forecastDateTime.getMinutes() ===
                                    firstForecastDateTime.getMinutes()
                        ) {
                              // Check if the date is unique
                              const forecastDate = forecastDateTime.getDate();
                              if (!uniqueForecastDays.includes(forecastDate)) {
                                    uniqueForecastDays.push(forecastDate);
                                    return true;
                              }
                        }
                        // Check if it's the last day
                        const isLastDay =
                              forecast === data.list[data.list.length - 1];
                        // If it's the last day, set the time to "00:00:00"
                        if (isLastDay) {
                              forecastDateTime.setHours(0, 0, 0, 0);
                        }

                        return isLastDay; // Include the forecast for the last day
                  });
                  // Display the fiveDaysForecast array
                  console.log(fiveDaysForecast);
                  weathercard.innerHTML = "";
                  currentweather.innerHTML = "";
                  fiveDaysForecast.forEach((weatherItem, index) => {
                        if (index === 0) {
                              currentweather.insertAdjacentHTML(
                                    "beforeend",
                                    createWeatherCard(
                                          weatherItem,
                                          index,
                                          formattedTime
                                    )
                              );
                        } else
                              weathercard.insertAdjacentHTML(
                                    "beforeend",
                                    createWeatherCard(weatherItem, index)
                              );
                  });
            })
            .catch(() => {
                  alert(
                        "An error occurred while fetching the weather forecast"
                  );
            });
}


