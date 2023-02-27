import React, { useState } from "react";
import './Wayfinding.scss';
import { useRef, useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { ReactComponent as WalkingIcon } from '../../assets/walking.svg';
import { ReactComponent as QuestionIcon } from '../../assets/question.svg';

function Wayfinding({ onStartDirections, onBack, location }) {

    /** Referencing the start location DOM element */
    const startSearchFieldRef = useRef();

    /** Referencing the end location DOM element */
    const endSearchFieldRef = useRef();

    /** Referencing the accessibility details DOM element */
    const detailsRef = useRef();

    /** Referencing the results container DOM element */
    const resultsContainerRef = useRef();

    const [hasInputFocus, setHasInputFocus] = useState(true);

    useEffect(() => {
        /** Variable for determining the active search field */
        let activeSearchField;

        /** Add start location results list. */
        setupSearchResultsHandler(startSearchFieldRef);

        /** Clear start location results list. */
        clearResultList(startSearchFieldRef, resultsContainerRef);

        /** Add end location results list. */
        setupSearchResultsHandler(endSearchFieldRef);

        /** Clear end location results list. */
        clearResultList(endSearchFieldRef, resultsContainerRef);

        /**
         * Click event handler function that sets the display text of the input field,
         * and clears out the results list.
         */
        function clickHandler(clickEvent) {
            const name = clickEvent.target.location.properties.name;
            activeSearchField.setDisplayText(name);
            resultsContainerRef.current.innerHTML = '';
            setHasInputFocus(true);
        }

        /*
        * Get all the mi-list-item-location component.
        * Loop through them and remove the event listener.
        */
        function clearEventListeners() {
            const listItemLocations = document.querySelectorAll('mi-list-item-location');
            listItemLocations.forEach(element => {
                element.removeEventListener('click', clickHandler);
            });
        }

        /**
         * Search location and add results list implementation.
         * Listen to the 'results' event provided by the 'mi-search' component.
         * For each search result create a 'mi-list-item-location' component for displaying the content.
         * Append all the results to the results container.
         * Listen to the events when the item is clicked, and set the location value to be the selected one.
         */
        function setupSearchResultsHandler(locationRef) {
            locationRef.current.addEventListener('results', e => {
                clearEventListeners();
                resultsContainerRef.current.innerHTML = '';
                for (const result of e.detail) {
                    const listItem = document.createElement('mi-list-item-location');
                    listItem.location = result;
                    resultsContainerRef.current.appendChild(listItem);
                    listItem.addEventListener('click', clickHandler);
                }
            });

        }

        /**
         * Listen to the 'cleared' event provided by the 'mi-search' component.
         * Clear the results list.
        */
        function clearResultList(locationRef, resultsRef) {
            clearEventListeners();

            locationRef.current.addEventListener('cleared', () => {
                resultsRef.current.innerHTML = '';
            });
        }

        // Listen to click events on the input and set the input focus to true.
        startSearchFieldRef.current.addEventListener('click', () => {
            activeSearchField = startSearchFieldRef.current;
            setHasInputFocus(true);
        });

        endSearchFieldRef.current.addEventListener('click', () => {
            activeSearchField = endSearchFieldRef.current;
            setHasInputFocus(true);
        });
    }, []);

    useEffect(() => {
        // If there is a location selected, pre-fill the value of the `to` field with the location name.
        if (location) {
            endSearchFieldRef.current.value = location.properties.name;
        }
    }, [location]);

    return (
        <div className={`wayfinding ${hasInputFocus ? 'wayfinding--full' : 'wayfinding--fit'}`}>
            <div className="wayfinding__directions">
                <div className="wayfinding__title">Start wayfinding</div>
                <button className="wayfinding__close" onClick={() => onBack()} aria-label="Close">
                    <CloseIcon />
                </button>
                <div className="wayfinding__locations">
                    <label className="wayfinding__label">
                        TO
                        <mi-search ref={endSearchFieldRef} placeholder="Search by name, category, building..." mapsindoors="true"></mi-search>
                    </label>
                    <label className="wayfinding__label">
                        FROM
                        <mi-search ref={startSearchFieldRef} placeholder="Search by name, category, building..." mapsindoors="true"></mi-search>
                    </label>
                </div>
            </div>
            <div className="wayfinding__results" ref={resultsContainerRef}></div>
            {/* Fixme: Add functionality to the accessibility feature. */}
            <div className={`wayfinding__details ${hasInputFocus ? 'wayfinding__details--hide' : 'wayfinding__details--show'}`} ref={detailsRef}>
                <div className="wayfinding__accessibility">
                    <input className="mi-toggle" type="checkbox" />
                    <div>Accessibility</div>
                    <QuestionIcon />
                </div>
                <hr></hr>
                <div className="wayfinding__info">
                    {/* Fixme: Implement dynamic value rendering. */}
                    <div className="wayfinding__distance">
                        <WalkingIcon />
                        <div>Distance:</div>
                        <div className="wayfinding__meters">545m</div>
                    </div>
                    <div className="wayfinding__time">
                        <ClockIcon />
                        <div>Estimated time:</div>
                        <div className="wayfinding__minutes">2m</div>
                    </div>
                </div>
                <button className="wayfinding__button" onClick={() => onStartDirections()}>
                    <CheckIcon />
                    Go!
                </button>
            </div>
        </div>
    )
}

export default Wayfinding;