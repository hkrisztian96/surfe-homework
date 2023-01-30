import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useAppContext } from '../../..'
import { Note } from '../../../types/note'
import { NoteFooter } from './footer/NoteFooter'
import './NoteCard.scss'
import { NoteText } from './text/NoteText'

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
    <div className="note">
      <div className="note__title">Note - {id}</div>
      <NoteText id={id} text={body} onChangeText={saveTextDebounced} />
      <NoteFooter id={note.id} isLoading={isSaving} />
    </div>
  )
}
