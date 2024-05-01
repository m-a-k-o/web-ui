import { ReactComponent as QuestionIcon } from '../../assets/question.svg';
import './Tooltip.scss';
import i18n from 'i18next'

/**
 * A tooltip for displaying text on hover effect on desktop and tap on mobile.
 *
 * @param {Object} props
 * @param {string} props.text - The text to be displayed in the tooltip.
 */
function Tooltip({text}) {
    return <div className="tooltip">
        <QuestionIcon />
        <div dir={i18n.dir()} className="tooltip__text">
            <p>{text}</p>
            <i></i>
        </div>
    </div>
}

export default Tooltip;
