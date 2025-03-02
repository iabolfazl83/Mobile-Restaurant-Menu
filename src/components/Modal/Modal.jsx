import React, {useEffect} from 'react'
import {createPortal} from 'react-dom';
import './Modal.scss';

export default function Modal({isOpen, onClose, elementClass, children}) {

    return createPortal(
        <>
            {
                elementClass === children.props.className ?
                    <div className="popup-wrapper">
                        <div className={`close-modal position-fixed ${isOpen ? 'active' : ''}`} onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="#ffffff" aria-hidden="true" className="p-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <div className={`popup-modal ${isOpen ? 'active' : ''}`}>
                            <div className="popup-modal-container">
                                {children}
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </>

        , document.getElementById('modal') // this will let react-dom know that we want to render this modal outside the current React tree
    )
}