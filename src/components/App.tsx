import React from 'react'
import { NoteService } from '../services/NoteService'
import { UserService } from '../services/UserService'
import { Context } from '../types/context'
import { Notes } from './notes/Notes'

const initializeContext = () => {
  return {
    noteService: new NoteService(),
    userService: new UserService(),
  }
}

const AppContext = React.createContext<Context>(null!)

export const useAppContext = () => {
  return React.useContext(AppContext)
}

export const App = () => {
  const context = initializeContext()
  return (
    <AppContext.Provider value={context}>
      <div>
        <Notes />
      </div>
    </AppContext.Provider>
  )
}
