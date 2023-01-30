import { useEffect, useMemo, useState } from 'react'
import { Note } from '../../types/note'
import { useAppContext } from '../App'
import { NewNote } from './note/new/NewNote'
import { NoteCard } from './note/NoteCard'
import './Notes.scss'
import { NotesTitle } from './NotesTitle'
import { NotesSidebar } from './sidebar/NotesSidebar'

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
    <>
      <NotesSidebar />
      <div className="notes">
        <NotesTitle />
        <NewNote setNotes={setNotes} />
        <div className="notes__grid">
          {sortedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </>
  )
}
