import { MutableRefObject } from 'react'

/**
 * Calculates the mention dropdown top offset using the main textarea and a helper one.
 * The position is based on the current position of the textarea caret.
 * @param mentionTextAreaRef the textarea that contains the mention dropdown.
 * @param helperTextAreaRef the helper textarea for calculating the position.
 * @returns the offset from the top of the textarea.
 */
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
