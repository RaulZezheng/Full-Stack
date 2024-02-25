import { useState } from 'react'

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
    copy.map(person => <div>{person.name} {person.number}</div>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [copy, setCopy] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const nameExists = persons.find(person => person.name === newName)
    const numberExists = persons.find(person => person.number === newNumber)

    if (nameExists || numberExists) {
      window.alert(`${newName} ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Person key={persons.name} copy={copy} />
    </div>
  )
}

export default App
