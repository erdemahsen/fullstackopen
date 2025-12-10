import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({name}) => {
  const [countryDetail, setCountryDetail] = useState(null)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        //console.log(response.data)
        const co = response.data
        setCountryDetail({
          name: co.name.common,
          capital: co.capital,
          area: co.area,
          languages: Object.values(co.languages),
          flags: co.flags
        })
      }
    
    )
  }, [])
  if(countryDetail === null){
    return <></>
  }
  
  return (
    <>
      <h1>{countryDetail.name}</h1>
      <p>Capital {countryDetail.capital}</p>
      <p>Area {countryDetail.area}</p>
      <h2>Languages</h2>
      <ul>{countryDetail.languages.map((c, index) => <li key={index}>{c}</li>)}</ul>
      <img src={countryDetail.flags.png} alt={countryDetail.flags.alt}/>
    </>
  )
}

const Countries = ({countries, curText}) => {
  const matchedCountries = countries.filter(c => c.toLowerCase().includes(curText.toLowerCase()))
  const [showedCountries, setShowedCountries] = useState([])

  function toggleShowedCountries(co) {
    if(showedCountries.includes(co))
      setShowedCountries(showedCountries.filter(c => c != co))
    else {
      setShowedCountries([...showedCountries, co])
    }
  }
  return (
    <>
      {matchedCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {matchedCountries.length < 10 && 
        matchedCountries.length > 1 &&  
        <ul>
          {matchedCountries.map((c, index) => 
              <li key={index}>
                {c} 
                <button onClick={() => (toggleShowedCountries(c)) }>{showedCountries.includes(c) ? "hide" : "show"}</button>
              </li>
          )}
          {showedCountries.map(c => <Country name = {c}/>)}
        </ul>
      }
      {matchedCountries.length === 1 &&
        <Country name={matchedCountries[0]}/>
      }
      
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [curText, setCurText] = useState('')

  function handleTextChange(event) {
    setCurText(event.target.value)
  }

  useEffect(() => {
    console.log("effect is ran")
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => 
        {
          const temp = response.data.map(c => c.name.common)
          setCountries(temp)
        }
      )
  }, [])

  return (
    <div>
      <input placeholder='e.g Finland' value={curText} onChange={handleTextChange}/>
      <Countries countries={countries} curText = {curText}/>
    </div>
  )
}

export default App