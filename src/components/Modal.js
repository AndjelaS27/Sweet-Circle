import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ message, onClose }) => {
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <button onClick={onClose} className="modal-close">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
