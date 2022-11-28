import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReview from './CreateReview';
import './CreateReview.css';

function EditReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="Create-Review" onClick={() => setShowModal(true)}>Create a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReview />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;