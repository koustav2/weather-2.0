/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'
import LeftSide from './components/LeftSide'
import getFotmattedWeatherData from './components/services/WeatherService'
// import Aside from './components/Aside'
import RightSide from './components/RightSide'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery] = useState({ q: 'kolkata' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? `Weather in ${query.q}` : `Weather in ${query.lat}, ${query.lon}`
      toast.info(`Fetching Weather for ${message}`)
      

      
      await getFotmattedWeatherData({ ...query, units })
        .then((data) => {
          toast.success(`Weather for ${data.name},${data.country}  fetched successfully`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )

          setWeather(data)
        })
    }

    fetchWeather()

  }, [query, units])



  return (
    <main className='flex flex-row  max-w-screen max-h-screen bg-[#100e1d]'>
      {weather &&
        <>
          <LeftSide weather={weather} items={weather.daily} setQuery={setQuery} units={units} setUnits={setUnits} />
          <RightSide weather={weather} items={weather.daily} setQuery={setQuery} units={units} setUnits={setUnits} />
        </>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // transition={slide}
      />
    </main>
  )
}

export default App
