/* eslint-disable no-undef */

import { DateTime } from "luxon";

/* eslint-disable no-unused-vars */
const API_KEY = '9a9c2e9b415c3c0b2fa42ca79c3ff8a1'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
// /weather?q={city name}&appid={API key}

// /forecast?q={city name}&appid={API key}
// var ONE_CALL ='https://api.openweathermap.org/data/3.0'

// /onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0
// /onecall?lat=22.572645&lon=88.363892&
// appid=9a9c2e9b415c3c0b2fa42ca79c3ff8a1
const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const res = await fetch(url);
    return await res.json();
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        name,
        main: { temp, feels_like, temp_min, temp_max, humidity , pressure},
        weather,
        visibility,
        dt,
        wind: { speed, deg },
        sys: { country, sunrise, sunset },

    } = data;

    const { main, description, icon } = weather[0];

    return {
        name,
        country,
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        sunrise,
        sunset,
        main,
        description,
        icon,
        dt,
        speed,
        deg,
        pressure,
        visibility,
    }
};

const formatForecastWeather = (data) => {
    let { timezone, daily } = data;
    daily = daily.slice(1, 6).map(day => {
        return {
            title: formatToLocalTime(day.dt, timezone, 'cccc'),
            icon: day.weather[0].icon,
            temp: day.temp.day,
            // description: day.weather[0].description
        }
    })

    return {timezone, daily }

}


const getFotmattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        'weather',
        searchParams
    )
        .then((formatCurrentWeather));

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData(
        'onecall',
        {
            lat, 
            lon, 
            exclude: 'current,minutely,hourly,alerts',
            units: searchParams.units
        }
    ).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather};

}

const formatToLocalTime = (secs,
    zone,
    format = `cccc, 
    
    dd LLL yyyy' 'hh:mm a`
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


 const iconUrlFromCode = (code) => {
    return `http://openweathermap.org/img/wn/${code}@2x.png`;
} 

export default getFotmattedWeatherData;

 export { formatToLocalTime, iconUrlFromCode };