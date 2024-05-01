import { useEffect, useRef } from 'react';
import i18n from 'i18next'

/**
 * React wrapper around the custom element <mi-dropdown>.
 *
 * @param {object} props
 * @param {function} selectionChanged - Triggers an event when the selection is changed.
 */
function Dropdown({ selectionChanged, children }) {
    const elementRef = useRef();

    useEffect(() => {
        const clickHandler = customEvent => selectionChanged(customEvent.detail);

        const { current } = elementRef;

        current.addEventListener('change', clickHandler);

        return () => current.removeEventListener('change', clickHandler);

    }, [selectionChanged]);


    return <mi-dropdown dir={i18n.dir()} ref={elementRef}>{children}</mi-dropdown>
}

export default Dropdown;
