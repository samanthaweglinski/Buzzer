import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteComment from "./DeleteComment"

function DeleteCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="delete-buzz-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteComment comment={comment} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
