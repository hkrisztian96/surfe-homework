import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../../..'
import { User } from '../../../../types/user'
import { getMentionOffsetTop } from '../../../../utils/position'
import { NoteMention } from '../mention/NoteMention'
import './NoteText.scss'
import { NoteTextBackdrop } from './NoteTextBackdrop'

type NoteTextProps = {
  id: number
  text: string
  onChangeText?: (text: string) => void
}

export const NoteText = (props: NoteTextProps) => {
  const { users } = useAppContext()

  const [text, setText] = useState<string>(props.text)

  const [mentionOffsetTop, setMentionOffsetTop] = useState<number>(0)
  const [mentionCursorPosition, setMentionCursorPosition] = useState<
    number | null
  >(null)
  const [mentionText, setMentionText] = useState<string>('')

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const textAreaHelperRef = useRef<HTMLTextAreaElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setText(value)

    if (mentionCursorPosition !== null) {
      const indexOfWhitespace = value.indexOf(' ', mentionCursorPosition)
      const endOfMentionText =
        indexOfWhitespace === -1 ? value.length : indexOfWhitespace
      setMentionText(value.substring(mentionCursorPosition, endOfMentionText))
    }

    props.onChangeText?.(value)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      mentionCursorPosition !== null &&
      (event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'Enter')
    ) {
      event.preventDefault()
    }

    setTimeout(() => {
      if (event.key === '@') {
        setMentionText('')
        setMentionOffsetTop(getMentionOffsetTop(textAreaRef, textAreaHelperRef))
        setMentionCursorPosition(textAreaRef.current!.selectionStart)
      }
      if (mentionCursorPosition !== null && event.key === 'Escape') {
        setMentionCursorPosition(null)
      }
    })
  }

  const onScroll = () => {
    // Add setTimeout so the new text can get through before scrolling
    setTimeout(() => {
      if (backdropRef.current && textAreaRef.current) {
        backdropRef.current.scroll({
          behavior: 'auto',
          top: textAreaRef.current.scrollTop,
          left: textAreaRef.current.scrollLeft,
        })
      }
    })
  }

  const onBlur = () => {
    // setMentionCursorPosition(null)
  }

  const onMention = (user: User) => {
    const { username } = user
    setText((currentText) => {
      const preString = currentText.substring(0, mentionCursorPosition!)
      const postString = currentText.substring(
        mentionCursorPosition! + mentionText.length,
        currentText.length
      )
      const modifiedPostString = postString.length > 0 ? postString : ' '
      const newText = preString + username + modifiedPostString
      props.onChangeText?.(newText)
      return newText
    })

    setMentionCursorPosition(null)

    if (textAreaRef.current && mentionCursorPosition) {
      const cursorPosition = mentionCursorPosition + username.length + 1 // Plus one because of the extra space
      textAreaRef.current.setSelectionRange(cursorPosition, cursorPosition)
    }
  }

  useEffect(() => {
    if (mentionCursorPosition !== null && !text[mentionCursorPosition - 1]) {
      setMentionCursorPosition(null)
    }
  }, [text])

  return (
    // Reverse default stacking
    <div className="text-container" style={{ zIndex: props.id }}>
      <textarea
        ref={textAreaRef}
        className="text-container__text"
        spellCheck="false"
        value={text}
        onChange={onChangeText}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        onBlur={onBlur}
      />
      <textarea
        ref={textAreaHelperRef}
        className="text-container__caret-position-helper"
      />
      <NoteTextBackdrop innerRef={backdropRef} text={text} users={users} />
      <NoteMention
        isOpen={mentionCursorPosition !== null}
        offsetLeft={0}
        offsetTop={mentionOffsetTop}
        filterText={mentionText}
        users={users}
        onMention={onMention}
      />
    </div>
  )
}
