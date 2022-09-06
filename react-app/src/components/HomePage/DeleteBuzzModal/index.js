import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBuzz from "./DeleteBuzz";

function DeleteBuzzModal({ buzz }) {
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
          <DeleteBuzz buzz={buzz} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBuzzModal;
