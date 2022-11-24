import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/review';
import './CreateReview.css';

const CreateReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    const user = useSelector(state => state.session.user);
    const product = useSelector(state => state.product.singleProduct);
    const userId = user.id
    // const productId = product.id

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
      e.preventDefault();
      setErrors([]);  

    let Review = {review, stars}

    if (!Review.review.length) return setErrors(["Review can not be empty"]);
    if (!Review.stars.length) return setErrors(["Star can not be empty"]);
    if (Review.stars > 5 || Review.stars < 1) return setErrors(["Stars must be between 1 to 5"]);

    const payload = {
        user_id: userId,
        product_id: productId, 
        review, 
        stars
    };
  
    dispatch(createReviewThunk(payload, productId)).then(() => {
        history.push(`/products/${productId}`);
    })
    }

  const cancelHandler = (e) => {
    e.preventDefault();
    history.push(`/products/${productId}`);
  };

  return (
    <section>
      <form className="CreateReviewForm-Container" onSubmit={submitHandler}>
        <h3 className="CreateReviewForm-Title">Create A Review</h3>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <input
            className='CreateReviewForm_Input'
            type="text"
            placeholder='Write your review'
            value={review}
            onChange={(e) => setReview(e.target.value)} 
        />
        <input
            className='CreateReviewForm-Input'
            type="number"
            placeholder="Stars"
            value={stars}
            // min="1"
            // max="5"
            onChange={(e) => setStars(e.target.value)} 
        />
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