import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Note } from '../../../../types/note'
import { useAppContext } from '../../../App'
import './NoteCreate.scss'

type NoteCreateProps = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export const NoteCreate = (props: NoteCreateProps) => {
  const { noteService } = useAppContext()

  const createNote = () => {
    noteService
      .createNote('Type something here...')
      .then((response) =>
        props.setNotes((currentNotes) => [...currentNotes, response.data])
      )
  }
  return (
    <div className="add-container">
      <button className="add-button" onClick={createNote}>
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
    </div>
  )
}
