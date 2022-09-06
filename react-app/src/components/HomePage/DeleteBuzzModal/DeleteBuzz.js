import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteBuzz } from "../../../store/buzzes";

function DeleteBuzz({ buzz, onClick }) {
    let dispatch = useDispatch();
    let history = useHistory();

    const onDelete = () => {
        dispatch(deleteBuzz(buzz.id))
        history.push('/')
    }

    return (
        <div className="delete-buzz">
            <div className="delete-head">
                <h3>Delete buzz?</h3>
                <div>Are you sure you want to delete this buzz?</div>
            </div>
            <div className="delete-option delete-button" onClick={onDelete}>Delete</div>
            <div className="delete-option cancel" onClick={onClick}>Cancel</div>
        </div>
    )
}

export default DeleteBuzz
