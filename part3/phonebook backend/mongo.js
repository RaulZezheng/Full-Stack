const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0.bawjuf4.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)

// mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
//   name: String,
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      }
    },
    minLength: 8,
    required: true
  },
//   number: String,
})

// const Person = mongoose.model('Person', noteSchema)

// if (process.argv.length==3) {
//   console.log('phonebook:')
//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person.name,person.number)
//     })
//     mongoose.connection.close()
//   })  
// }

// if (process.argv.length==5) {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   })

//   person.save().then(result => {
//     console.log('added',process.argv[3],'number',process.argv[4],'to phonebook')
//     mongoose.connection.close()
//   })
// }

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', noteSchema)


