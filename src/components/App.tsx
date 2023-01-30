import React, { useEffect, useState } from 'react'
import { NoteService } from '../services/NoteService'
import { UserService } from '../services/UserService'
import { Context } from '../types/context'
import { Notes } from './notes/Notes'

const initializeContext = () => {
  const noteService = new NoteService()
  const userService = new UserService()
  return {
    noteService,
    userService,
    users: [],
  }
}

export const AppContext = React.createContext<Context>(null!)

export const useAppContext = () => {
  return React.useContext(AppContext)
}

export const App = () => {
  const [context, setContext] = useState<Context>(initializeContext())

  useEffect(() => {
    context.userService.getUsers().then((response) =>
      setContext((currentContext) => {
        return {
          ...currentContext,
          users: response.data,
        }
      })
    )
  }, [])

  return (
    <AppContext.Provider value={context}>
      <Notes />
    </AppContext.Provider>
  )
}
