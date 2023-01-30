import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../..'
import { User } from '../../../types/user'
import { NoteMentionUser } from '../note/mention/NoteMentionUser'
import './NotesSidebar.scss'

export const NotesSidebar = () => {
  const { userService } = useAppContext()

  const [users, setUsers] = useState<User[]>([])
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    window.innerWidth <= 1000
  )

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    username: string
  ) => {
    event.dataTransfer.setData('username', username)
  }

  useEffect(() => {
    userService
      .getMostMentionedUsers()
      .then((response) => setUsers(response.data))

    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={
        'notes-sidebar ' + (isCollapsed ? 'notes-sidebar--collapsed' : '')
      }
    >
      <div className="notes-sidebar__header">
        <span>Most mentioned</span>
      </div>
      <div className="notes-sidebar__items">
        {users.map((user) => (
          <div
            key={user.username}
            draggable={true}
            onDragStart={(event) => onDragStart(event, user.username)}
          >
            <NoteMentionUser user={user} />
          </div>
        ))}
      </div>
    </div>
  )
}
