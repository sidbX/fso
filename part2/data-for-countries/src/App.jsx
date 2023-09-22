import { useEffect, useState } from "react"
import axios from "axios"

const Display = ({ messages, showCountry }) => {
  
  if (messages.length === 1) {
    if (typeof messages[0] === "string") {
      return <div>{messages[0]}</div>
    } else {
      const country = messages[0]
      let imgLink = ""

      if (country.hasOwnProperty("flags")) {
        if (country.flags.hasOwnProperty("png")) {
          imgLink = country.flags.png
        } else if (country.flags.hasOwnProperty("svg")) {
          imgLink = country.flags.svg
        }
      }
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map((lang) => (
              <li>{lang}</li>
            ))}
          </ul>
          <img src={imgLink} alt={country.flags.alt} />
        </div>
      )
    }
  } else {
    return (
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {messages.map(message => (
          <li key={message}>{message}<button onClick={()=>showCountry(message)}>show</button></li>
        ))}
      </ul>
    )
  }
}

const App = () => {
  const [searchInput, setSearchInput] = useState("")
  const [allCountryNames, setAllCountryNames] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const allCountriesData = response.data.map(
          (countryObj) => countryObj.name.common
        )
        console.log(allCountriesData)
        setAllCountryNames(allCountriesData)
      })
  }, [])

  if (!allCountryNames) {
    return null
  }

  const showCountry = (country) => {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
        )
        .then(response => setMessages([ response.data ]))
  }
  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
    const filteredNames = allCountryNames.filter((name) =>
      name.toLowerCase().includes(event.target.value.toLowerCase())
    )

    if (filteredNames.length > 10) {
      setMessages(["Too many matches, specify another filter"])
    } else if (filteredNames.length > 1) {
      setMessages(filteredNames)
    } else if (filteredNames.length === 1) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${filteredNames[0]}`
        )
        .then((response) => {
          console.log(response.data)
          setMessages([response.data])
        })
    } else {
      setMessages([])
    }
  }

  return (
    <>
      find countries <input value={searchInput} onChange={handleInputChange} />
      <Display messages={messages} showCountry={showCountry}/>
    </>
  )
}

export default App
