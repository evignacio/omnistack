import React from 'react';

import './Modal.css'

function Modal() {
    return <div id="Modal" className="modal">
                <header>Sucesso</header>
                <div className="modal-body">
                    body
                </div>
                <a href="" className="button-sucess">Ok</a>
                <a href="" className="button-cancel">Cancelar</a>
            </div>
}

export default Modal;