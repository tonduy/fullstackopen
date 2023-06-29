import React, {useState} from 'react'
import Country from './Country'

const Countries = ({countries}) => {
    const [currentCountry, setCurrentCountry] = useState(null)
    let countriesFiltered = countries

    if (countriesFiltered.length > 10) {
        console.log(countriesFiltered.length)
        return 'Too many matches, specify another filter'
    }

    const handleShowClick = (country) => {
        setCurrentCountry(c => c === country ? null : country)
    }

    if (countriesFiltered.length === 1) {
        return (
            <div>
                <Country country={countriesFiltered[0]}/>

            </div>
        )
    } else {
        return (
            <div>
                {countriesFiltered.map(country =>
                    <div key={country.area}>
                        {country.name.common} <button onClick={() => handleShowClick(country)}>show</button>
                        {currentCountry === country && <Country country={country}/>}
                    </div>
                )}
            </div>
        )
    }
}

export default Countries
