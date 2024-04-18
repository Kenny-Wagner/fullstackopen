import { useState, useEffect} from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

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
const Country = ({country, visibleCountries, setVisibleCountries, isVisible}) => {
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
    </div>
    )
  }


const App = () => {
 const [country, setCountry] = useState('')
 const [allCountries, setAllCountries] = useState([])
 const [visibleCountries, setVisibleCountries] = useState([])


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
    return (
    <div>
      <Form country={country} setCountry={setCountry} />
      <Country key={filteredCountries[0]} country = {filteredCountries[0]} 
      visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} isVisible={true}/>
    </div>
    )
  }
  return (
    <div>
      <Form country={country} setCountry={setCountry}/>
      {filteredCountries.map(country => 
        <div>
        <Country key={country.name.common} country = {country} 
        visibleCountries={visibleCountries} setVisibleCountries={setVisibleCountries} 
        isVisible={visibleCountries.includes(country)} />
        </div>
        )
      }
    </div>
  )
}

export default App