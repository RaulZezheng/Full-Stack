import { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({searchName,handleSearchName}) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={handleSearchName}/>
    </div>
  )
}

const PersonForm = ({addPerson,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({copy,persons,setPersons}) => {
  const deleteperson = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} ?`)
    if (confirmed) {
      personService
        .delete(person.id)
        .then(() => {
          setPersons(persons.filter(per => per.id !== person.id))
        })
    }
  }
  console.log(copy)
  return (
    copy.map(person =>
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={ () => deleteperson(person)}>
        delete
      </button>
    </div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [copy, setCopy] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const nameExists = persons.find(person => person.name === newName)
    const numberExists = persons.find(person => person.number === newNumber)

    if (numberExists) {
      window.alert(`${newNumber} is already added to phonebook`)
    } else {
      if (nameExists) {
        const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmed) {
          const found = persons.find(per => per.name === nameObject.name)
          personService
            .update(found.id, nameObject)
            .then((response) => {
              setPersons(persons.map(per => per.id !== found.id? per:response.data))
            })
        } 
      } else {
        setPersons(persons.concat(nameObject))
        personService
          .create(nameObject)
          .then(response => {
            console.log(response)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    const containStr = persons.filter(person => person.name && person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setCopy(containStr)
    console.log(copy)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Person key={persons.id} copy={copy} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App

  