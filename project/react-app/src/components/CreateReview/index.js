import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';
import './CreateReview.css';

function CreateReviewModal({reviews}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-review-button" onClick={() => setShowModal(true)}>Write a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview setShowModal={setShowModal} reviews={reviews}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;