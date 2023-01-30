import { useEffect, useRef } from 'react'
import { User } from '../../../../types/user'
import { capitalizeFirstLetter } from '../../../../utils/stringUtils'
import { useKeyPress } from '../../../../utils/useKeyPress'
import './NoteMentionUser.scss'

type NoteMentionUserProps = {
  user: User
  onMention?: (mentionedUser: User) => void
  focus?: boolean
}

export const NoteMentionUser = ({
  user,
  onMention,
  focus,
}: NoteMentionUserProps) => {
  const enterPressed = useKeyPress('Enter')

  const userDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (focus) {
      userDivRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }, [focus])

  useEffect(() => {
    if (enterPressed && focus) {
      onMention?.(user)
    }
  }, [enterPressed])

  return (
    <div
      key={user.email}
      ref={userDivRef}
      className={'user ' + (focus ? 'user--focused' : '')}
      onMouseDown={() => onMention?.(user)}
      tabIndex={-1}
    >
      <div className="user__data">
        <div>
          {capitalizeFirstLetter(user.first_name) +
            ' ' +
            capitalizeFirstLetter(user.last_name)}
        </div>
        <div className="user__data--secondary">{'@' + user.username}</div>
      </div>
    </div>
  )
}
