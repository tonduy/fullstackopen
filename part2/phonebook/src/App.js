import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }

    useEffect(hook, [])

    const checkIfNameExists = (name) =>
        persons.some(person => {
            return person.name.toLowerCase() === name.toLowerCase();
        })


    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber,
            id: Math.max(...persons.map(person => person.id)) + 1
        }

        if (checkIfNameExists(newName)) {
            alert(newName + ' is already added to phonebook')
        }

        let newPersonsArray = persons.concat(newPerson)
        setPersons(newPersonsArray)
        setNewName('')
        setNewNumber('')
        console.log('button clicked', event.target)
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
            <h3>Add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App