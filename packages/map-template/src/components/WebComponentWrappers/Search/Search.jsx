import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import useNear from '../../../hooks/useNear';

/**
 * React wrapper around the custom element <mi-search>.
 *
 * @param {object} props
 * @param {string} props.placeholder - Placeholder in search field.
 * @param {boolean} props.mapsindoors - Set to true to search in MapsIndoors Locations.
 * @param {function} props.results - Function that is called when search results are received.
 * @param {function} props.clicked - Function that is called when search field is clicked.
 * @param {function} props.cleared - Function that is called when search field is cleared.
 * @param {boolean} props.clear - Programatically clear the search field.
 * @param {string} props.displayText - Display text in the search field when the user selects a result.
 * @param {boolean} props.hasInputFocus - If set to true, it will set focus to the input field.
 * @param {string} props.category - If set, search will be performed for Locations having this category.
 * @param {function} props.valueChanged - Function that is called when the search field value changes. Passes the value as payload.
 *
 */
const SearchField = forwardRef(({ placeholder, mapsindoors, results, clicked, cleared, displayText, hasInputFocus, category, valueChanged }, ref) => {
    const elementRef = useRef();

    /** Instruct the search field to search for Locations near the map center. */
    const searchNear = useNear();

    /**
     * Methods that can be triggered on the mi-search element.
     */
    useImperativeHandle(ref, () => ({
        triggerSearch() {
            elementRef.current.triggerSearch()
        },
        getValue() {
            return elementRef.current.value;
        }
    }));

    useEffect(() => {
        const searchResultsHandler = customEvent => results(customEvent.detail);

        const { current } = elementRef;

        if (mapsindoors === true) {
            current.mapsindoors = 'true';
        }

        if (displayText) {
            current.setDisplayText(displayText);
        }

        if (hasInputFocus && !current.value) {
            current.focusInput();
        }

        current.addEventListener('results', searchResultsHandler);
        current.addEventListener('click', clicked);
        current.addEventListener('cleared', cleared);

        return () => {
            current.removeEventListener('results', searchResultsHandler);
            current.removeEventListener('click', clicked);
            current.removeEventListener('cleared', cleared);
        }

    }, [placeholder, mapsindoors, results, clicked, cleared, displayText, hasInputFocus]);

    return <mi-search ref={elementRef} placeholder={placeholder} mi-near={searchNear} mi-categories={category}  />
});

export default SearchField;
