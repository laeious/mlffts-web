import React from 'react';


export default (props) => {

    return (
        <div className="modal is-active is-overflow">
            <div className="modal-background" onClick={props.toggle}></div>
            <div className="modal-content">
                {props.children}
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={props.toggle}></button>
        </div>
    )
}