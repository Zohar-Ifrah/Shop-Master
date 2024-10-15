import React from 'react'
import Modal from 'react-modal'

export function ConfirmModal({ isOpen, onRequestClose, onConfirm, msg = 'Are you sure?', msgContant = '' }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Cancel"
            className="modal"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            
            <h2>{msg}</h2>
            <span>{msgContant}</span>
            <div className="actions">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onRequestClose}>No</button>
            </div>
        </Modal>
    )
}
