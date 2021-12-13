import React,{useState,useEffect,useCallback} from 'react'
import './SearchMain.css'
import WeatherDetails from './WeatherDetails';
import axios from 'axios';


const SearchMain = () => {
    let [searchTerm, setSearchTerm] = useState("");
    let [tempInfo, setTempInfo] = useState({});


const handleSubmit = (e)=>{
    e.preventDefault() 


}

const getWeatherInfo = useCallback((city)=>{

axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7f71d176a71277c4ed35b7fd3d0074ea`)
    .then((response)=> {
        const { temp, humidity, pressure } = response.data.main
        const { main: weatherType } = response.data.weather[0];
        const { name } = response.data;
        const { speed } = response.data.wind;
        const { country, sunset } = response.data.sys;
        
        const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weatherType,
            name,
            speed,
            country,
            sunset
        }
        
        setTempInfo(myNewWeatherInfo)
    })
    
},[])

useEffect(()=>{
    getWeatherInfo()
},[getWeatherInfo])
    return (
        <React.Fragment>
      <div className="wrap">
        <form onSubmit={handleSubmit} className="search">
          <input
            type="search"
            placeholder="Search city.."
            id="search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type='submit' className="searchButton" onClick={()=>getWeatherInfo(searchTerm)}>
            Search
          </button>
        </form>
      </div>
      
      <WeatherDetails {...tempInfo} />
    </React.Fragment>
    )
}

export default SearchMain
