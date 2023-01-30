import React from 'react'
import { useAppContext } from '../../../..'
import { Note } from '../../../../types/note'
import './NewNote.scss'

type NewNoteProps = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export const NewNote = (props: NewNoteProps) => {
  const { noteService } = useAppContext()

  const createNote = () => {
    noteService
      .createNote('Type something here...')
      .then((response) =>
        props.setNotes((currentNotes) => [...currentNotes, response.data])
      )
  }
  return (
    <div className="new-note-container">
      <button className="new-note-button" onClick={createNote}>
        New Note
      </button>
    </div>
  )
}
