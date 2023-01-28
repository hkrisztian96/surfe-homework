import { MutableRefObject } from 'react'
import { MentionPosition } from '../types/mentionPosition'

export const getMentionPosition = (
  ref: MutableRefObject<HTMLTextAreaElement | null>
): MentionPosition => {
  if (!ref.current) {
    return { offsetLeft: 0, offsetTop: 0 }
  }

  const { current } = ref

  const DEFAULT_TOP_OFFSET = 20
  const SELECTION_START_TO_LEFT_OFFSET_RATIO = 9
  const LINE_LENGTH = 33

  const lines = current.value.substring(0, current.selectionStart).split('\n')
  const lastLine = lines[lines.length - 1]

  const lineBreakModifiedSelectionStart =
    (lines.length - 1) * LINE_LENGTH + lastLine.length

  const cursorLeftOffsetByCharacter =
    lineBreakModifiedSelectionStart % LINE_LENGTH
  const cursorTopOffsetByCharacter = lines.length * DEFAULT_TOP_OFFSET

  const offsetLeft =
    current.offsetLeft +
    cursorLeftOffsetByCharacter * SELECTION_START_TO_LEFT_OFFSET_RATIO

  const offsetTop = cursorTopOffsetByCharacter + current.offsetTop

  return { offsetLeft, offsetTop }
}
