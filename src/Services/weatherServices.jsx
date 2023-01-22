import { DateTime } from "luxon";
const { isElementOfType } = require("react-dom/test-utils");

const API_KEY = "f83b34ab470baff13764c1b08ad7f2e5";

const BASE_URL = "https://api.openweathermap.org/data/2.5"
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feel_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]

    return { lat, lon, temp, feel_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
};

const formatForecastweather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map()
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts',
        units: searchParams.units,
    }).then(formatForecastweather)

    return formattedCurrentWeather;
};

const formatToLocalTime = (secs, zone, format = "cccc,dd LLL,yyyy'|Local time:'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;