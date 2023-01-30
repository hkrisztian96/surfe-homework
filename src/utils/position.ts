import { MutableRefObject } from 'react'

export const getMentionOffsetTop = (
  mentionTextAreaRef: MutableRefObject<HTMLTextAreaElement | null>,
  helperTextAreaRef: MutableRefObject<HTMLTextAreaElement | null>
): number => {
  if (!mentionTextAreaRef.current || !helperTextAreaRef.current) {
    return 0
  }

  const cs = window.getComputedStyle(mentionTextAreaRef.current)
  const pl = parseInt(cs.paddingLeft)
  const pr = parseInt(cs.paddingRight)
  let lh = parseInt(cs.lineHeight)

  if (isNaN(lh)) {
    lh = parseInt(cs.fontSize)
  }

  helperTextAreaRef.current.style.width =
    mentionTextAreaRef.current.clientWidth - pl - pr + 'px'

  helperTextAreaRef.current.style.font = cs.font
  helperTextAreaRef.current.style.letterSpacing = cs.letterSpacing
  helperTextAreaRef.current.style.whiteSpace = cs.whiteSpace
  helperTextAreaRef.current.style.wordBreak = cs.wordBreak
  helperTextAreaRef.current.style.wordSpacing = cs.wordSpacing

  helperTextAreaRef.current.value = mentionTextAreaRef.current.value.substring(
    0,
    mentionTextAreaRef.current.selectionEnd
  )

  let numberOfLines = Math.floor(helperTextAreaRef.current.scrollHeight / lh)

  if (numberOfLines == 0) {
    numberOfLines = 1
  }

  const SIZE_OF_LINE = 22
  const DEFAULT_OFFSET = 10

  const offsetTop =
    numberOfLines * SIZE_OF_LINE -
    mentionTextAreaRef.current.scrollTop +
    DEFAULT_OFFSET

  return offsetTop
}
