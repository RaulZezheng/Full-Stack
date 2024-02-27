import { useState, useEffect } from 'react'
import axios from 'axios'


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

const Person = ({copy}) => {
  return (
    copy.map(person => <div key={person.id}>{person.name} {person.number}</div>)
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
      id: persons.length + 5
    }
    const nameExists = persons.find(person => person.name === newName)
    const numberExists = persons.find(person => person.number === newNumber)

    if (nameExists || numberExists) {
      window.alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
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
    const containStr = persons.filter(person => person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setCopy(containStr)
    console.log(copy)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
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
      <Person key={persons.id} copy={copy} />
    </div>
  )
}

export default App

  
