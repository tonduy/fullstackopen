const Persons = ({personsToShow, deletePerson}) => (
    <div>
        {personsToShow.map(person =>
            <div key={person.id}>
                <p> {person.name} {person.number}</p>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
            </div>)}

    </div>
)

export default Persons;