import { NoteService } from '../services/NoteService'
import { UserService } from '../services/UserService'
import { User } from './user'

export type Context = {
  noteService: NoteService
  userService: UserService
  users: User[]
}
