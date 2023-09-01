import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Note } from './models/note.js'

const app = express()
const PORT = process.env.PORT

let notes = []

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/', (req, res) => {
  const notes = Note.find({})
    .then(notes => {
      res.json(notes)
    })
  res.render('index.html', notes)
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => {
      res.json(note)
    })
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note(
    {
      content: body.content,
      important: body.important || false
    }
  )

  note.save()
    .then(savedNote => {
      res.json(savedNote)
    })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
