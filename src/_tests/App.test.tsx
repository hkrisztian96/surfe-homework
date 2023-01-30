import { act, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { App } from '../components/App'
import { Note } from '../types/note'
import { User } from '../types/user'
import {
  GET_MOST_MENTIONED_USERS_URL,
  GET_NOTES_URL,
  GET_USERS_URL,
} from '../utils/urls'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

beforeEach(async () => {
  const mockNotes: Note[] = [
    { id: 1, body: 'Mock note1' },
    { id: 2, body: 'Mock note2' },
    { id: 3, body: 'Mock note3' },
  ]
  const mockUsers: User[] = [
    {
      email: 'mock@email.com',
      first_name: 'Bob',
      last_name: 'Mock',
      username: 'bobmock123',
    },
  ]

  mockedAxios.get.mockImplementation((url) => {
    switch (url) {
      case GET_NOTES_URL:
        return Promise.resolve({ data: mockNotes })
      case GET_USERS_URL:
        return Promise.resolve({ data: mockUsers })
      case GET_MOST_MENTIONED_USERS_URL:
        return Promise.resolve({ data: mockUsers })
      default:
        return Promise.reject(new Error('not found'))
    }
  })
})

test('Load app.', async () => {
  act(() => {
    render(<App />)
  })
  await waitFor(async () => {
    const title = await screen.findByText(/Surfe Homework Notes/i)
    expect(title).toBeInTheDocument()
  })
})

test('Render notes.', async () => {
  act(() => {
    render(<App />)
  })
  await waitFor(async () => {
    const notes = await screen.findAllByTestId('note')
    expect(notes).toHaveLength(3)
  })
})
