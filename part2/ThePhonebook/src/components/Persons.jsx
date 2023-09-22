import personService from '../services/Persons'

const deletePerson = (person, removePerson) => {
  if(window.confirm(`Delete ${person.name} ?`)){
    personService.removePerson(person.id)
    .then(response => {
      console.log(response);
      removePerson(person.id)
    })
  }

}

const Persons = ({persons,removePerson}) => {
    return (
      <>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person,removePerson)}>delete</button>
          </p>
        ))}
        </>
    );
}

export default Persons