import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import './index.css'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

const Persons = ({persons, newFilter, setPersons}) => {
  
  const filterPersons = () => 
    persons.filter(person => 
      person.name.toUpperCase()
      .includes(newFilter.toUpperCase())
    )
  
  
  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      phonebookService
      .deleteEntry(person.id)
      .then( response => {
        console.log(`Successfully deleted ${person.name} from database`)
        setPersons(persons.filter(val => val.id !== person.id))
      })
      .catch( error => console.log(`Could not delete ${person.name} from database`))
    }
  }

  return (
    filterPersons().map(person => 
    <div key= {person.name}>
      {person.name} {person.number}

      <button onClick = {() => deletePerson(person)} >delete</button>
    </div>
    )                
  )
}

const Filter = ({newFilter, setNewFilter}) => {
  return (
  <div>
    filter shown with <input
    value = {newFilter}
    onChange = {(event)=> setNewFilter(event.target.value)}  />
  </div>
  )
}

const PersonForm = ({ persons, newName, setNewName, newNumber, setNewNumber, setPersons, setMessage, setMessageType }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person =>  
      person.name.trim().toUpperCase() === newName.trim().toUpperCase()
    ) 

    if (foundPerson) {
      const prompt = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (confirm(prompt)) {
        foundPerson.number = newNumber
        phonebookService
          .update(foundPerson.id, foundPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : response ))
            setMessage(`${foundPerson.name}'s number has been changed to ${newNumber}`)
            setMessageType('good')
            setTimeout( () => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${foundPerson.name} has already been removed from server`)
            setMessageType('error')
            setTimeout( () => {
              setMessage(null)
            }, 5000)
          })
      }
    }
    else {
      const newPerson = {
        name: newName, 
        number: newNumber,
      }

      phonebookService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage(`Added ${newPerson.name}`)
          setMessageType('good')
          setTimeout( () => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout( () => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('') 
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input
      value={newName}
      onChange ={(event) => setNewName(event.target.value)} />
    </div>
    <div>
      number: <input
      value = {newNumber}
      onChange = {(event) =>setNewNumber(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setMessage] = useState(null)
  const [newMessageType, setMessageType] = useState('')

  useEffect( () => {
    phonebookService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
   
  }, [] )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {newMessage} messageType = {newMessageType} />
      <Filter newFilter = {newFilter} setNewFilter = {setNewFilter} />

      <h3>add a new </h3>

      <PersonForm persons = {persons} newName={newName} setNewName = {setNewName} 
      newNumber = {newNumber} setNewNumber = {setNewNumber} setPersons ={setPersons} 
      setMessage={setMessage} setMessageType = {setMessageType} />

      <h3>Numbers</h3>

        <Persons persons = {persons} newFilter = {newFilter} setPersons ={setPersons} />

    </div>
    
  )
}

export default App