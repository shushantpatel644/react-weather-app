import logo from './logo.svg';
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocations from './components/TimeAndLocations';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
// import getWeatherData from './Services/weatherServices';
import getFormattedWeatherData from './Services/weatherServices';
import { useEffect, useState } from 'react';


function App() {
  const [query, setQuery] = useState({ q: 'berlin' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then(
        (data) => {
          setWeather(data);
        });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400'>
      <TopButtons />
      <Inputs />

      {weather && (
        <div>
          <TimeAndLocations weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
