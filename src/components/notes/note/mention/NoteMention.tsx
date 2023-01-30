import { useEffect, useMemo, useState } from 'react'
import { User } from '../../../../types/user'
import { useKeyPress } from '../../../../utils/useKeyPress'
import './NoteMention.scss'
import { NoteMentionUser } from './NoteMentionUser'

type NoteMentionProps = {
  isOpen: boolean
  offsetTop: number
  offsetLeft: number
  users: User[]
  onMention: (mentionedUser: User) => void
  filterText?: string
}

export const NoteMention = ({
  isOpen,
  offsetTop,
  offsetLeft,
  users,
  onMention,
  filterText,
}: NoteMentionProps) => {
  const upArrowPressed = useKeyPress('ArrowUp')
  const downArrowPressed = useKeyPress('ArrowDown')

  const [focusedUserIndex, setFocusedUserIndex] = useState<number | null>(null)

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const fullName = user.first_name + ' ' + user.last_name
        if (!filterText) {
          return true
        }
        return (
          fullName.includes(filterText) || user.username.includes(filterText)
        )
      })
      .slice(0, 5)
  }, [users, filterText])

  useEffect(() => {
    const firstIndex = 0
    const lastIndex = filteredUsers.length - 1
    if (upArrowPressed) {
      if (focusedUserIndex === null || focusedUserIndex === firstIndex) {
        setFocusedUserIndex(lastIndex)
      } else {
        setFocusedUserIndex(
          (currentFocusedUserIndex) => currentFocusedUserIndex! - 1
        )
      }
    } else if (downArrowPressed) {
      if (focusedUserIndex === null || focusedUserIndex === lastIndex) {
        setFocusedUserIndex(firstIndex)
      } else {
        setFocusedUserIndex(
          (currentFocusedUserIndex) => currentFocusedUserIndex! + 1
        )
      }
    }
  }, [upArrowPressed, downArrowPressed])

  useEffect(() => {
    if (!isOpen) {
      setFocusedUserIndex(null)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className="mention" style={{ top: offsetTop, left: offsetLeft }}>
          {filteredUsers.map((user, index) => (
            <NoteMentionUser
              key={user.username}
              user={user}
              focus={index === focusedUserIndex}
              onMention={onMention}
            />
          ))}
        </div>
      )}
    </>
  )
}
