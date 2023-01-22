const { isElementOfType } = require("react-dom/test-utils");

const API_KEY = "f83b34ab470baff13764c1b08ad7f2e5";

const BASE_URL = "https://api.openweathermap.org/data/2.5"
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const getWeatherdata = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    console.log(url);
    return fetch(url)
        .then((res) => res.json())
        .then((data) => data);
};

const getFormattedWeatherdata = (searchParams) => {

}
export default getWeatherdata;