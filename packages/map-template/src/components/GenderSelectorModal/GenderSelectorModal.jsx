import './GenderSelectorModal.scss'
import { useState } from 'react'

function GenderSelectorModal() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [gender, setGender] = useState(null);

    return (<>
        {isModalOpen &&
            <div>
                <div className="gender-modal__overlay"></div>

                <div dir="ltr" className="gender-modal">
                    <div className="gender-modal__content">
                        <div className={`gender-modal__item ${gender === 'men' ? 'gender-modal__item__selected' : ''}`} onClick={() => setGender('men')}>
                            <svg viewBox="0 0 320 320" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M204.976 85.5685C180.126 77.1185 160.001 91.8748 160.001 91.8748C160.001 91.8748 139.876 77.1185 115.026 85.5685L118.038 141.525C120.82 167.55 144.463 184.275 160.007 184.275C175.551 184.275 199.195 167.544 201.976 141.525L204.988 85.5685H204.976Z"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M215.781 59.9937H104.219C99.6625 59.9937 95.9688 56.2999 95.9688 51.7437C95.9688 47.1874 99.6625 43.4937 104.219 43.4937H215.781C220.338 43.4937 224.031 47.1874 224.031 51.7437C224.031 56.2999 220.338 59.9937 215.781 59.9937Z"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M107.312 42.9062C118.275 27.1312 137.775 16.6499 160 16.6499C182.225 16.6499 201.725 27.1312 212.688 42.9062"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M128.432 166.812L121.432 197.544L160.001 223.819L198.57 197.544L191.569 166.812"
                                      stroke="currentColor" stroke-width="5" stroke-miterlimit="10"
                                      stroke-linecap="round" />
                                <path
                                    d="M198.569 197.543C198.569 197.543 274.219 223.675 284.831 241.325C298.531 264.106 301.006 303.35 301.006 303.35"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M121.431 197.543C121.431 197.543 45.7812 223.675 35.1687 241.325C21.4687 264.106 18.9937 303.35 18.9937 303.35"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M252.031 219.319L219.125 59.2876" stroke="currentColor" stroke-width="5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round" />
                                <path d="M100.875 59.2876L67.9624 219.319" stroke="currentColor" stroke-width="5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round" />
                            </svg>

                            <div className="gender-modal__item__title">Men</div>
                        </div>

                        <div  className={`gender-modal__item ${gender === 'women' ? 'gender-modal__item__selected' : ''}`} onClick={() => setGender('women')}>
                            <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M230.259 178.512C215.491 203.856 192.597 221.319 160.834 221.319C143.153 221.319 128.222 215.912 115.903 206.75"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M160.822 174.819C123.147 174.819 114.022 121.85 114.022 96C114.022 70.15 134.972 49.2 160.822 49.2C186.672 49.2 207.622 70.15 207.622 96C207.622 121.85 198.497 174.819 160.822 174.819Z"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M114.584 107.9C118.059 85.4874 137.441 68.3374 160.822 68.3374C184.203 68.3374 203.591 85.4936 207.059 107.9"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M298.134 295.781C298.134 295.781 298.134 219.713 249.984 206.75C229.847 199.056 229.653 180.969 229.853 162.938L229.041 93.2625C229.041 55.1313 198.128 24.2188 159.997 24.2188C121.865 24.2188 90.9529 55.1313 90.9529 93.2625L90.1406 162.938C90.3468 180.969 90.1467 199.063 70.0154 206.75C21.8592 219.719 21.8654 295.781 21.8654 295.781"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                                <path
                                    d="M52.6594 215.4C81.5531 244.237 119.041 261.637 160.003 261.637C200.966 261.637 238.453 244.231 267.347 215.4"
                                    stroke="currentColor" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" />
                            </svg>

                            <div className="gender-modal__item__title">Women</div>
                        </div>
                    </div>

                    <div className="gender-modal__footer">
                        <button type="button" className={`gender-modal__button ${gender === null ? 'gender-modal__button__disabled' : 'gender-modal__button__active' }`} onClick={() => setIsModalOpen(false)}>Continue</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default GenderSelectorModal;
