import { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherAPIUrl = 'https://api.openweathermap.org'
const Form = ({country, setCountry}) => {
  return (
    <div>
      <form onSubmit ={(event) => event.preventDefault()}>
        find countries <input value ={country}
        onChange ={(event) => setCountry(event.target.value)} />
      </form>
    </div>
  )
}
const Country = ({country, visibleCountries, setVisibleCountries, isVisible, countryWeather}) => {
    if (isVisible === false){
      return (
        <div>
          {country.name.common}
          <button onClick={()=> setVisibleCountries(visibleCountries.concat(country))}>
            show
          </button>
        </div>
      ) 
    }

    return (
      <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages)
         .map(lang =>
           <li key={lang}>{lang}</li>
         )
        }
      </ul>
      <img src ={country.flags.png} ></img>
      <h1>Weather in {country.capital}</h1>
      <p>temperature {countryWeather.main.temp} </p>
      <img src ={`${weatherAPIUrl}/img/wn/${country.icon}@2x.png`}></img>
      
    </div>
    )
  }


const App = () => {
 const [country, setCountry] = useState('')
 const [allCountries, setAllCountries] = useState([])
 const [visibleCountries, setVisibleCountries] = useState([])
 const [countryWeather, setCountryWeather] = useState(null)

 useEffect(() => {
  axios
  .get(`${baseUrl}/all`)
  .then(response => setAllCountries(response.data))
 }, [])

 const filteredCountries = allCountries
  .filter(entry => 
    entry.name.common.toUpperCase().includes(country.toUpperCase()))
    
    if(filteredCountries.length > 10){
      return (
      <div>
        <Form country={country} setCountry={setCountry}/>
        Too many matches, specify another filter 
      </div>
      )
    }

  if(filteredCountries.length === 1) {

    const [lat,lon] = filteredCountries[0].latlng
    const fullUrl = `${weatherAPIUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    console.log(fullUrl)
      
    if (countryWeather === null) {
      axios
      .get(fullUrl)
      .then((response) =>setCountryWeather(response.data))
      return <div></div>
    }

    return (
    <div>
      <Form country={country} setCountry={setCountry} />
      <Country key={filteredCountries[0].name.common} country = {filteredCountries[0]} 
      visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} isVisible={true} 
      countryWeather={countryWeather}/>
    </div>
    )
  }
  return (
    <div>
      <Form country={country} setCountry={setCountry}/>
      {filteredCountries.map(filteredCountry => 
        <Country key={filteredCountry.name.common} country = {filteredCountry} 
        visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} 
        isVisible={visibleCountries.includes(filteredCountry)} 
        countryWeather={countryWeather} />
        )
      }
    </div>
  )
}

export default App