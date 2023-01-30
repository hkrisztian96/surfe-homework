import axios from 'axios'
import { Note } from '../types/note'
import { GET_NOTES_URL, POST_NOTE_URL, PUT_NOTE_URL } from '../utils/urls'

/**
 * Service that handles Challenge API note related actions.
 */
export class NoteService {
  /**
   * Loads all the notes from the Challenge API.
   * @returns all notes.
   */
  public getNotes = async () => {
    return await axios.get<Note[]>(GET_NOTES_URL)
  }

  /**
   * Creates a note calling the Challenge API with the provided text.
   * @param text the text of the note.
   * @returns the created note.
   */
  public createNote = async (text: string) => {
    return await axios.post<Note>(POST_NOTE_URL, { body: text })
  }

  /**
   * Updates the given note with the provided text using the Challenge API.
   * @param id the id of the note.
   * @param text the text of the note.
   */
  public updateNote = async (id: number, text: string) => {
    await axios.put(PUT_NOTE_URL + id, { body: text })
  }
}
