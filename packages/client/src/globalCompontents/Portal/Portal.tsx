import Node from "postcss/lib/node";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./Portal.scss";

export const Portal = ({ children }: { children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element) }) => {
    const mount = document.getElementById("portal-root");
    const el = document.createElement("div");

    useEffect(() => {
        if (!mount) return;
        mount.appendChild(el);
        return () => { mount.removeChild(el) }
    }, [el, mount]);

    return createPortal(children, el)
};

export const ModalContainer = ({ children }: { children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element) }) => {
    return (
        <div className="modal-container">
            <div className="white-box">
                {children}
            </div>
        </div>
    )
}
