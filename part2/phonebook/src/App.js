import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
        personService.getAll().then(persons => {
            setPersons(persons)
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

            if (window.confirm(newName + ' is already added to phonebok, replace the old number with a new one?')) {
                const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
                const updatedPerson = {
                    name: personToUpdate.name,
                    number: newNumber,
                    id: personToUpdate.id
                }
                personService.update(updatedPerson.id, updatedPerson).then(person => {
                    let newPersonsArray = persons.map(p => p.id === person.id ? person : p)
                    setPersons(newPersonsArray)
                    setNewName('')
                    setNewNumber('')
                })
            }

        } else {
            personService.create(newPerson).then(person => {
                let newPersonsArray = persons.concat(person)
                setPersons(newPersonsArray)
                setNewName('')
                setNewNumber('')
            })

        }

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

    const deletePerson = (id) => {
        const personToDelete = persons.find(person => person.id === id)

        if (window.confirm('Delete ' + personToDelete.name)) {
            personService.deletePerson(id).then(() => {
                let newPersonsArray = persons.filter(person => {
                    return person.id !== id
                })
                setPersons(newPersonsArray)
            })
        }

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
            <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
        </div>
    )
}

export default App