import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.set('strictQuery', false)

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3ssvlc.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to ', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema(
  {
    content: String,
    important: Boolean
  }
)

export const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
