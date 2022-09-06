import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBuzzForm from "./EditBuzzForm";

const EditBuzzModal = ({ buzz }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-buzz-button" onClick={() => setShowModal(true)}>
        Edit
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBuzzForm buzz={buzz} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditBuzzModal;
