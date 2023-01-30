import { useEffect, useState } from 'react'
import React from 'react'
import { User } from '../../../../types/user'
import './NoteTextBackdrop.scss'

type NoteTextBackdropProps = {
  text: string
  users: User[]
  innerRef?: React.MutableRefObject<HTMLDivElement | null>
}

export const NoteTextBackdrop = ({
  text,
  users,
  innerRef,
}: NoteTextBackdropProps) => {
  const [highlightedText, setHighlightedText] = useState<string>(text)

  useEffect(() => {
    setHighlightedText(text)
  }, [text])

  const highlightMentions = (s: string) => {
    const mentions = s.match(/@\w+/gm)
    mentions?.forEach((mention) => {
      const username = mention.replace('@', '')
      if (users.some((user) => user.username === username)) {
        s = s.replaceAll(
          mention,
          '<span class="note-backdrop--mark">' + mention + '</span>'
        )
      }
    })

    s = s.replace(/\n$/g, '\n\n')
    var isIE = !!window.navigator.userAgent
      .toLowerCase()
      .match(/msie|trident\/7|edge/)
    if (isIE) {
      // IE wraps whitespace differently in a div vs textarea, this fixes it
      text = text.replace(/ /g, ' <wbr>')
    }

    return s
  }

  return (
    <div ref={innerRef} className="note-backdrop">
      <div
        className="note-backdrop__highlights"
        dangerouslySetInnerHTML={{
          __html: highlightMentions(highlightedText),
        }}
      />
    </div>
  )
}
