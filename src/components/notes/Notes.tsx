import { useEffect, useState } from 'react'
import { Note } from '../../types/note'
import { useAppContext } from '../App'
import { NoteCreate } from './note/create/NoteCreate'
import { NoteCard } from './note/NoteCard'
import './Notes.scss'

export const Notes = () => {
  const { noteService } = useAppContext()

  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    noteService.getNotes().then((response) => setNotes(response.data))
  }, [])

  return (
    <div className="container">
      <div className="container__grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
        <NoteCreate setNotes={setNotes} />
      </div>
    </div>
  )
}
