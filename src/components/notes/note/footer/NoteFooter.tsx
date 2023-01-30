import {
  faTextSlash,
  faList,
  faImage,
  faPencil,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'react-tooltip'
import './NoteFooter.scss'

type NoteFooterProps = {
  id?: number
  isLoading?: boolean
}

export const NoteFooter = ({ isLoading, id }: NoteFooterProps) => {
  return (
    <div className="note-footer">
      <div
        id={'note-footer__disabled-' + id}
        className="note-footer__disabled"
        data-tooltip-content="These features are disabled in the coding challenge version."
      >
        <FontAwesomeIcon icon={faTextSlash} />
        <FontAwesomeIcon icon={faList} />
        <FontAwesomeIcon icon={faImage} />
        <FontAwesomeIcon icon={faPencil} />
      </div>
      {isLoading && (
        <div>
          <FontAwesomeIcon icon={faSpinner} spin={true} />
        </div>
      )}
      <Tooltip anchorId={'note-footer__disabled-' + id} place="bottom" />
    </div>
  )
}
