/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { formatToLocalTime } from './services/WeatherService'
import { iconUrlFromCode } from './services/WeatherService'

import earth from '../assets/earth.gif'
// import 'font-awesome/css/font-awesome.min.css';
function LeftSide({ weather: {
    dt,
    name,
    timezone,
    country,
    temp,
    main,
    description,
    icon,
},
    title,
    items,
    setQuery,
    units, setUnits, }) {

    const [city, setCity] = useState('')

    const handleSearch = (e) => {   
        // e.preventDefault()
        // console.log(city)
        // console.log(query)
        // && e.key === 'Enter'
        // console.log(e.key)
        // console.log(e.currentTarget.value)
        // console.log(e.target.value)
        if (city!== '' ) {
            setQuery({ q: city })
            // setCity('')
        }
    }

    const handleLocation = () => {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
               console.log(position)
               setQuery({ lat, lon })
           })
       }
    }
//w-1/3 
    return (
        <>

            <section className='w-1/3 max-md:h-screen  bg-[#1E213A] '>
                <div className='flex flex-col items-center h-full'>
                    <div className='text-[#88869D] '>
                        <div className='flex flex-row items-center justify-evenly w-full h-12 px-4 mt-4 bg-[#0b043b] rounded-full'>
                            <input className='w-[50%] h-[50%] px-3 text- bg-transparent outline-none '
                                value={city}
                                onChange={(e) => setCity(e.currentTarget.value)}   
                                type='text'
                                placeholder='Enter City...' />
                            <UilSearch 
                            size={25} 
                            onClick={handleSearch}
                            className='cursor-pointer transition ease-out hover:scale-125' />
                            <div>
                                <UilLocationPoint 
                                size={25} 
                                onClick={handleLocation}
                                className=' cursor-pointer transition ease-out hover:scale-125 ' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 items-center justify-evenly pt-20 pb-10'>
                        <div className=''>
                            <h1 className='text-3xl flex gap-5  font-bold text-[#88869D] '>{name}</h1>

                        </div>
                        <div className=''>
                            <h1 className='text-2xl font-bold text-[#88869D]'>
                                {country}
                            </h1>
                        </div>
                    </div>
                    <div className='flex flex-col gap-10 items-center justify-center '>

                        <div>
                            <span className=' flex text-5xl font-bold text-[#88869D]'>
                                {temp.toFixed()}
                                <h1 className='text-2xl'>°
                                {units === 'metric' ? 'C' : 'F'}
                                </h1></span>
                        </div>
                        <img
                            src={iconUrlFromCode(icon)}

                            alt="" className='w-[100px] ' 
                            
                            />
                        <div className=''>
                            <h1 className='text-4xl font-bold text-[#88869D] '>
                                {main}
                            </h1>
                        </div>

                    </div>
                    <div className='datetime pt-20 '>

                            <h1 className='text-xl inline animation  font-bold text-[#5249b3]'>
                                {formatToLocalTime(dt, timezone)}
                            </h1>



                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftSide