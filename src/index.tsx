import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import 'react-tooltip/dist/react-tooltip.css'
import './index.scss'
import { NoteService } from './services/NoteService'
import { UserService } from './services/UserService'
import { Context } from './types/context'

const initializeContext = async () => {
  const noteService = new NoteService()
  const userService = new UserService()
  const users = (await userService.getUsers()).data
  return {
    noteService,
    userService,
    users,
  }
}

const AppContext = React.createContext<Context>(null!)

export const useAppContext = () => {
  return React.useContext(AppContext)
}

const render = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  const context = await initializeContext()
  root.render(
    <React.StrictMode>
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    </React.StrictMode>
  )
}

render()
