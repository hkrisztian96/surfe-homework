import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Note } from '../../../types/note'
import './NoteCard.scss'
import { NoteFooter } from './footer/NoteFooter'
import { NoteText } from './text/NoteText'
import { useAppContext } from '../../..'

type NoteCardProps = {
  note: Note
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const { id, body } = note
  const { noteService } = useAppContext()

  const [isSaving, setIsSaving] = useState<boolean>(false)

  const saveTextDebounced = useDebouncedCallback((newText: string) => {
    setIsSaving(true)
    noteService
      .updateNote(id, newText)
      .finally(() => setTimeout(() => setIsSaving(false), 1000))
  }, 1000)

  useEffect(() => saveTextDebounced.flush, [])

  return (
    <div className="note-container">
      <div className="title">Note - {id}</div>
      <NoteText text={body} onChangeText={saveTextDebounced} />
      <NoteFooter id={note.id} isLoading={isSaving} />
    </div>
  )
}
