import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/review';
import './CreateReview.css';

const CreateReview = ({setShowModal}) => {
  
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    const user = useSelector(state => state.session.user);

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
      e.preventDefault();
      
      let Review = {review, stars}
      
      if (!Review.review.length) return setErrors(["Review field can not be empty"]);
      if (!Review.stars.length) return setErrors(["Rating field can not be empty"]);
      if (Review.stars > 5 || Review.stars < 1) return setErrors(["Rating must be between 1 to 5"]);
      
      const data = { 
        user_id: user.id,
        productId: productId,
        review, 
        stars
      }
    
    setErrors([]);  
    dispatch(createReviewThunk(data))
    
    .then(() => {
        history.push(`/products/${productId}`);
        // setShowModal(false)
    })
    }

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push(`/products/${productId}`);
    // setShowModal(false)
  };

  return (
    <section>
      <form className="CreateReviewForm-Container" onSubmit={submitHandler}>
        <div className="CreateReviewForm-Title">Create A Review</div>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label className='CreateReviewForm-Label'>
          Write Your Review
          <textarea
            className='CreateReviewForm-Input'
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)} 
            />
        </label>
        <label className='CreateReviewForm-Label'>
          Rating
        <input
            className='CreateReviewForm-Input'
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)} 
        />
        </label>
        <button type="submit" className='CreateReview-Submit-Button'>Submit</button>
        <button type="button" 
        onClick={cancelHandler}
         className='CreateReview-Cancel-Button'
        >
        Cancel
        </button>
      </form>
    </section>
  );
}

export default CreateReview;