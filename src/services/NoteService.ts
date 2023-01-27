import axios from 'axios'
import { Note } from '../types/note'
import { GET_NOTES_URL, POST_NOTE_URL, PUT_NOTE_URL } from '../utils/urls'

export class NoteService {
  public getNotes = async () => {
    return await axios.get<Note[]>(GET_NOTES_URL)
  }

  public createNote = async (text: string) => {
    return await axios.post<Note>(POST_NOTE_URL, { body: text })
  }

  public updateNote = async (id: number, text: string) => {
    await axios.put(PUT_NOTE_URL + id, { body: text })
  }
}
