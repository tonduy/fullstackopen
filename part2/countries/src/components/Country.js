import React, {useEffect, useState} from "react";
import weatherService from "../services/weatherService";

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState([]);

    const weatherHook = () => {
        weatherService.getWeather(country.capital[0]).then(weather => {
            setWeather(weather)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(weatherHook, [])

    return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        <ul>
            {Object.keys(country.languages).map(key => <li key={country.languages[key]}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flag} width="50%" height="50%"/>
            <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weather?.current?.temp_c} C</p>
        <p>wind {weather?.current?.wind_kph} kph</p>
    </div>
    );
};

export default CountryInfo;
