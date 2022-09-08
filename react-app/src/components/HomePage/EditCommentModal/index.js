import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";

const EditCommentModal = ({ comment }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-buzz-button" onClick={() => setShowModal(true)}>
        Edit
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm
            comment={comment}
            onClick={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;
