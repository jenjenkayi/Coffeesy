import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './EditReview';
import './EditReview.css';

function EditReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-review-button" onClick={() => setShowModal(true)}>Edit a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;