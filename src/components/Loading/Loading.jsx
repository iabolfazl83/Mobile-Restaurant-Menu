import React, {useContext, useEffect} from 'react'
import {createPortal} from 'react-dom';
import './Loading.scss';
import {AppContext} from "@/Context/AppContext.jsx";

export default function LoadingCircle() {
    const {showLoader} = useContext(AppContext)
    useEffect(() => {
        showLoader ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden")

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [showLoader]);

    return createPortal(
        <div className="loading-circle rounded-0 glass-bg">
            <div className="loader"></div>
        </div>
        , document.getElementById('loading') // this will let react-dom know that we want to render this modal outside the current React tree
    )
}