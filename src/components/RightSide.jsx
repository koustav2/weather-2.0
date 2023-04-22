/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { iconUrlFromCode } from './services/WeatherService';

function LeftBelow({ weather: {
  lat,
  lon,
  temp,
  feels_like,
  temp_min,
  temp_max,
  humidity,
  name,
  dt,
  country,
  sunrise,
  sunset,
  details,
  icon,
  speed,
  deg,
  clouds,
  timezone,
  description,
  main,
  visibility,
  pressure,


},
  title,
  items,
  setQuery,
  units,
  setUnits,

}) {


  const handleUnitsChange = (e) => {
    const selectdUnit = e.target.name
    if  (units !== selectdUnit) {
      setUnits(selectdUnit)
    }
  }

 
//w-full h-screen

  return (
    <>
      <section className=' w-screen  h-screen '>
        <div className=' celFer flex gap-3 justify-end  '>
          <button
            type=""
            name='metric'
            onClick={handleUnitsChange}
            className='text-l font-bold text-white round1 transition ease-out hover:scale-125'
          >°C</button>
          <button
            type=""
            name='imperial'
            onClick={handleUnitsChange}
            className='text-l font-bold text-white round2 transition ease-out hover:scale-125 '
          >°F</button>
        </div>
        <div className='flex flex-row  justify-first gap-5 pl-[120px] forcast'>
          {items.map((item) => (
            <div className='first'>
              <h1>
                {item.title}

              </h1>
              <img src={
                iconUrlFromCode(item.icon)
              } alt="" />
              <h1 className='text-xl'>
                {item.temp.toFixed()}
                {units === 'metric' ? '°C' : '°F'}
                </h1>
            </div>
          ))

          }
        </div>
        <div>
          <h1 className='text-2xl  h1 p-2 ml-10 italic'>Today's HighLights...</h1>
        </div>
        <div className=' gap-3 ml-[100px]  md:mt-[85px] utils '>
          <div className='container mt-0'>
            <div className='flex flex-col  items-cente box'>
              <div className='flex flex-col  items-center '>
                <h1 className='text-3xl'>Wind Speed</h1>
                <br />
                <h1 className='text-[green]'>
                  {speed} {units === 'metric' ? 'km/h' : 'miles/h'}
                  </h1>
              </div>
            </div>
            <div className='flex flex-col  items-center box '>
              <div className='flex flex-col items-center'>
                <h1 className='text-3xl'> Visibility</h1>
                <br />
                <h1 className='text-[green]'>
                  {visibility} m
                  </h1>
              </div>
            </div>
            <div className='flex flex-col items-center  box'>
              <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Humidity</h1>
                <br />
                <h1 className='text-[green]'>
                  {humidity} %</h1>
              </div>
            </div>
            <div className='flex flex-col items-center  box'>
              <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Air Pressure</h1>
                <br />
                <h1 className='text-[green]'>
                  {pressure} mb
                </h1>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default LeftBelow;