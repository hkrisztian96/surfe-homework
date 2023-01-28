import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { User } from '../../../../types/user'
import { getMentionPosition } from '../../../../utils/position'
import { NoteMention } from '../mention/NoteMention'
import './NoteText.scss'

type NoteTextProps = {
  text: string
  onChangeText?: (text: string) => void
}

export const NoteText = (props: NoteTextProps) => {
  const [text, setText] = useState<string>(props.text)

  const [mentionPosition, setMentionPosition] = useState<number | null>(null)
  const [mentionText, setMentionText] = useState<string>('')

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setText(value)

    if (mentionPosition !== null) {
      const indexOfWhitespace = value.indexOf(' ', mentionPosition)
      const endOfMentionText =
        indexOfWhitespace === -1 ? value.length : indexOfWhitespace
      setMentionText(value.substring(mentionPosition, endOfMentionText))
    }

    props.onChangeText?.(value)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === '@') {
      setMentionText('')
      setMentionPosition(textAreaRef.current!.selectionStart)
    }

    if (
      mentionPosition !== null &&
      (event.key === 'Escape' || !text[mentionPosition - 1])
    ) {
      setMentionPosition(null)
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      mentionPosition !== null &&
      (event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'Enter')
    ) {
      event.preventDefault()
    }
  }

  const onMention = (user: User) => {
    const { username } = user
    setText((currentText) => {
      const preString = currentText.substring(0, mentionPosition!)
      const postString = currentText.substring(
        mentionPosition! + mentionText.length,
        currentText.length
      )
      const modifiedPostString = postString.length > 0 ? postString : ' '
      const newText = preString + username + modifiedPostString
      props.onChangeText?.(newText)
      return newText
    })

    setMentionPosition(null)

    setTimeout(() => {
      textAreaRef.current?.focus()
      if (textAreaRef.current && mentionPosition) {
        const cursorPosition = mentionPosition + username.length + 1 // Plus one because of the extra space
        textAreaRef.current.setSelectionRange(cursorPosition, cursorPosition)
      }
    }, 100) // Needed an explicit timeout to handle the whole case correctly
  }

  const offsets = useMemo(
    () => getMentionPosition(textAreaRef),
    [
      textAreaRef.current?.getBoundingClientRect,
      textAreaRef.current?.selectionStart,
    ]
  )

  return (
    <div className="text">
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={onChangeText}
        onKeyUpCapture={onKeyUp}
        onKeyDown={onKeyDown}
      />
      <NoteMention
        isOpen={mentionPosition !== null}
        offsetLeft={offsets.offsetLeft}
        offsetTop={offsets.offsetTop}
        filterText={mentionText}
        onMention={onMention}
      />
    </div>
  )
}
