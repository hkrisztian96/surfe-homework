import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../..'
import { Note } from '../../types/note'
import { NewNote } from './note/new/NewNote'
import { NoteCard } from './note/NoteCard'
import './Notes.scss'
import { NotesTitle } from './NotesTitle'

export const Notes = () => {
  const { noteService } = useAppContext()

  const [notes, setNotes] = useState<Note[]>([])

  const sortedNotes = useMemo(
    () => notes.sort((n1, n2) => n2.id - n1.id),
    [notes]
  )

  useEffect(() => {
    noteService.getNotes().then((response) => setNotes(response.data))
  }, [])

  return (
    <div className="container">
      <NotesTitle />
      <NewNote setNotes={setNotes} />
      <div className="container__grid">
        {sortedNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
