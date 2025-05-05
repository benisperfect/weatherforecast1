<script setup>
import { cityWeather } from '../geocoding.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import '../assets/weather_icon.css';

const temp = ref('');
const humidity = ref('');
const description = ref('');
const pressure = ref('');
const seaLevel = ref('');
const windspeed = ref('');
const country = ref('');
const sunrise = ref('');
const sunset = ref('');
const weather_like = ref('/image/weather_icon/wind.png'); // default
const WeatherCardRef = ref(null);

const getWeatherData = async () => {
  const data = await cityWeather('Tokyo');

  return {
    description: data.weather[0].description,
    temp: data.main.temp,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    sea_lvl: data.main.sea_level,
    wind: data.wind.speed,
    country: data.sys.country,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    rain: data.rain ? data.rain['1h'] : 0,
  };
};

const WeatherData = async () => {
  const data = await getWeatherData();
  temp.value = data.temp;
  humidity.value = data.humidity;
  description.value = data.description;
  pressure.value = data.pressure;
  seaLevel.value = data.sea_lvl;
  windspeed.value = data.wind;
  country.value = data.country;
  sunrise.value = new Date(data.sunrise * 1000).toLocaleTimeString();
  sunset.value = new Date(data.sunset * 1000).toLocaleTimeString();

  const roundedTemp = Math.round(data.temp);
  if (data.rain !== 0) {
    if (roundedTemp >= 25 && roundedTemp <= 30) {
      weather_like.value = '/image/weather_icon/cloud-sun-rain.png';
    } else if (roundedTemp >= 0 && roundedTemp <= 24) {
      weather_like.value = '/image/weather_icon/cloud-showers.png';
    }
  }
};

// Call the function when component mounts
onMounted(() => {
  WeatherData();
});

  const ScrollToTop = () => {
    WeatherCardRef.value.style.top = -window.scrollY + 'px';
  }

  onMounted(() => {
    window.addEventListener('scroll', ScrollToTop);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', ScrollToTop);
  })
</script>

<template>
  <div @scroll="ScrollToTop" ref="WeatherCardRef" class="WeatherCard">
    <img :src="weather_like" id="weather_like" />

    <div class="temperature">
        {{ temp }}
    <span>°C</span>
    </div>

    <div class="description" id="description">{{ description }}</div>

    <div class="weather-info">
      <p>Humidity: <span id="humidity">{{ humidity }}</span>%</p>
      <p>Wind Speed: <span id="wind">{{ windspeed }}</span> km/h</p>
    </div>
  </div>
</template>
