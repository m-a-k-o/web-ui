import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import substepsToggledState from '../../../atoms/substepsToggledState';
import './Modal.scss';
import kioskLocationState from '../../../atoms/kioskLocationState';
import Draggable from 'react-draggable';

/**
 * A Modal for showing content in the Sidebar.
 *
 * The modal listens for changes in children in order to constraint the max height while making the content
 * scrollable.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - If the modal is open (visible) or not.
 */
function Modal({ children, isOpen }) {

    /** Boolean for controlling the "full" CSS class modifier */
    const [fullHeight, setFullHeight] = useState(false);

    const substeps = useRecoilValue(substepsToggledState);

    const kioskLocation = useRecoilValue(kioskLocationState);

    const modalRef = useRef();
    const contentRef = useRef();

    /*
     * Listen for changes in the children in order to set the fullHeight state.
     * If the height of the content is bigger than the height of the modal, the fullHeight should be set.
     */
    useEffect(() => {
        if (!contentRef.current) return;
        const observer = new MutationObserver(() => {
            const contentHeight = contentRef.current.clientHeight;
            const modalHeight = modalRef.current?.clientHeight;
            setFullHeight(contentHeight > modalHeight);
        });

        observer.observe(contentRef.current, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
        }
    }, [contentRef]);

    const [position, setPosition] = useState({ x: null, y: 0 });
    useEffect(() => {
        if (!modalRef.current) {
            return
        };

        const sizes = modalRef.current.getBoundingClientRect()
        const initialPosition = {
            x: (document.body.getBoundingClientRect().width - sizes.width) / 2,
            y: -1 * ((document.body.clientHeight - sizes.height) / 2)
        }
        setPosition(initialPosition)

        const resizeObserver = new ResizeObserver(() => {
            setTimeout(() => {
                const sizes = modalRef.current.getBoundingClientRect()

                const totalHeight = sizes.top + sizes.height

                console.log(sizes.top, sizes.height, totalHeight, document.body.getBoundingClientRect().height)

                if (document.body.getBoundingClientRect().height < totalHeight) {
                    console.log('now')
                    setPosition({ x: position.x ? position.x : initialPosition.x, y: document.body.getBoundingClientRect().height - sizes.height - 25 })
                } else if (sizes.y < 0) {
                    console.log('0')
                    setPosition({ x: position.x, y: -1 * (document.body.getBoundingClientRect().height - sizes.height) + 50 })
                }
            }, 50)
        });

        resizeObserver.observe(modalRef.current);

        return () => resizeObserver.disconnect(); // clean up
    }, []);

    return (
        <Draggable
            handle=".modal--draggable"
            position={position}
            onDrag={(e, { x, y }) => {
                setPosition({ x, y });
            }}
            scale={1}
            bounds="body"
        >
            <div ref={modalRef}
                 className={`modal ${isOpen ? 'modal--open' : ''} ${fullHeight ? 'modal--full' : ''} ${substeps ? 'modal--substeps' : ''} ${kioskLocation ? 'modal--kiosk' : ''}`}
            >
                <div className="modal--draggable">
                    <button type="button" className="modal--draggable__handle"></button>
                </div>
                <div ref={contentRef} className="modal__content">
                    {children}
                </div>
            </div>
        </Draggable>
    )
}

export default Modal;
