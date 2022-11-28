import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';
import './CreateReview.css';

function CreateReviewModal() {
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);

  return (
    <>
      <button className="create-review-button" onClick={() => setShowCreateReviewModal(true)}>Write a Review</button>
      {showCreateReviewModal && (
        <Modal onClose={() => setShowCreateReviewModal(false)}>
          <CreateReview />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;