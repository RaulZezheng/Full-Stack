import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchCountry,handleSearchCountry}) => {
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleSearchCountry} />
    </div>
  )
}

const DisplaySingle = ({copy}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState(null)
  
  useEffect (() => {
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${copy.capital}&units=metric&appid=${api_key}`
    axios.get(weather_url)
    .then(response => {
      setWeather(response.data)
    })
    .catch(error => {
      console.error('Error fetching weather data:',error)
    })
  },[copy.capital, api_key])

  if (weather !== null) {
    return (
      <div>
        <h2>
          {copy.name.common}
        </h2>
        <div>
          capital {copy.capital}
        </div>
        <div>
          area {copy.area}
        </div>
        <h3>
          languages:
        </h3>
        <div>
          <ul>
            {Object.values(copy.languages).map(lang => <li>{lang}</li>)}
          </ul>
        </div>
        <img src={copy.flags.png} alt={copy.flags.alt}>
        </img>
        <h2>Weather in {copy.capital}</h2>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}
const ShowSingle = ({country}) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show'}</button>
      {showDetails && <DisplaySingle copy={country} />}
    </div>
  )
}

const Result = ({copy,setSearchCountry}) => {
  if (copy.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (copy.length === 1) {
    return (
      <DisplaySingle copy={copy[0]} />
    )
  } else {
    return (
      copy.map(country => <ShowSingle country={country} />)
    )
  }

}
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [copy, setCopy] = useState([])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
    const containStr = countries.filter(country => country.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setCopy(containStr)
    console.log(copy)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
  console.log('render', countries.length, 'countries')

  return (
    <div>
      <Filter searchCountry={searchCountry} handleSearchCountry={handleSearchCountry} />
      <Result copy={copy} setSearchCountry={setSearchCountry} />
    </div>
  )
}

export default App

  
