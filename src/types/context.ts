import { NoteService } from '../services/NoteService'
import { UserService } from '../services/UserService'

export type Context = {
  noteService: NoteService
  userService: UserService
}
