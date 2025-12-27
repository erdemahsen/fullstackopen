const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! eg. 09-1234556 and 040-22334455 are valid phone numbers`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

// if(process.argv.length === 3) {
//     Person
//         .find({})
//         .then(persons => {
//             console.log("phonebook: ")
//             persons.forEach(person => console.log(person.name, person.number))
//             mongoose.connection.close()
//         })
// }
// else if(process.argv.length > 3){
//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4],
//     })

//     person.save().then(result => {
//         console.log(`added ${result.name} number ${result.number} to the phonebook`)
//         console.log(`id is ${result._id}`)
//         mongoose.connection.close()
//     })
// }
