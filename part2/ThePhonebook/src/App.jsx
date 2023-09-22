import { useEffect, useState } from "react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import PersonsFilter from "./components/PersonsFilter"
import personService from "./services/Persons"

const Notification = ({ messageObj }) => {
  console.log(messageObj);
  if (messageObj === null) {
    return null
  } else {
    if (messageObj.isError === true) {
      return (
        <div
          style={{
            color: "red",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        >
          {messageObj.message}
        </div>
      )
    }
    return (
      <div
        style={{
          color: "green",
          background: "lightgrey",
          fontSize: 20,
          borderStyle: "solid",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messageObj.message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [notificationMsg, setNotificationMsg] = useState(null)

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data)
    })
  }, [])

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        const personToUpdate = persons.filter(
          (person) => person.name === newName
        )[0]
        console.log(personToUpdate)
        personService
          .updatePerson({ ...personToUpdate, number: newNum })
          .then((updatedPerson) => {
            setPersons(
              persons
                .filter((person) => person.name !== newName)
                .concat(updatedPerson)
            )
          })
          .catch((err) => {
            setNotificationMsg({
              message: `Information of ${newName} has already been removed from server`,
              isError: true,
            })
            setTimeout(() => {
              setNotificationMsg(null)
            }, 5000)
          })
      }
      setNewNum("")
      setNewName("")
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
      }
      personService.addPerson(newPerson).then((returnedData) => {
        setPersons(persons.concat(returnedData))
        setNewNum("")
        setNewName("")
        setNotificationMsg({
          message: `Added ${newPerson.name}`,
          isError: false,
        })
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      })
    }
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const removePersonWithId = (personId) => {
    setPersons(persons.filter((person) => person.id !== personId))
  }

  const personsToDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue)
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageObj={notificationMsg} />
      <PersonsFilter
        filterValue={filterValue}
        handleFilterChange={handleFilterChange}
      ></PersonsFilter>

      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        newNum={newNum}
        handleInputChange={handleInputChange}
        handleNumChange={handleNumChange}
      ></PersonForm>

      <h1>Numbers</h1>
      <Persons
        persons={personsToDisplay}
        removePerson={(personsId) => removePersonWithId(personsId)}
      ></Persons>
    </div>
  )
}

export default App
