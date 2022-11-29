import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { editReviewThunk, getOneReviewThunk } from '../../store/review';
import './EditReview.css';

const EditReview = () => {
  // {setShowModal}
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();

    const currReview = useSelector(state => state.review.singleReview);
    const productId = currReview.product_id
    console.log("currReview", currReview)
    const [review, setReview] = useState(currReview.review);
    const [stars, setStars] = useState(currReview.stars);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    dispatch(getOneReviewThunk(reviewId))
  }, [dispatch, reviewId])

    const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = {
        reviewId: reviewId,
        productId: productId,
        review, 
        stars
    };

    if (!data.stars) return setErrors(["Review field can not be empty"]);
    if (!data.review.length) return setErrors(["Star rating field can not be empty"]);
    if (data.stars > 5 || data.stars < 1) return setErrors(["Star rating must be between 1 to 5"]);
  
    dispatch(editReviewThunk(data)).then(() => {
        history.push(`/products/${productId}`);
        })
    }

    const cancelHandler = (e) => {
      e.preventDefault();
      history.push(`/products/${productId}`);
      // setShowModal(false)
    }

return (
  <section>
    <div className="EditReview-Container">
      <form  onSubmit={submitHandler}>
        <h3 className="EditReview-Title">Edit Your Review</h3>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label className='EditReviewForm-Label'>
          Write Your Review
          <textarea
            className='EditReview-Input'
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)} 
          />
        </label>
        <label className='EditReviewForm-Label'>
          Rating
          <input
            className='EditReview-Input'
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)} 
          />
        </label>
        <button type="submit" className='EditReview-Submit-Button'>Submit</button>
        <button type="button" onClick={cancelHandler}
         className='EditReview-Cancel-Button'
        >
        Cancel
        </button>
      </form>
    </div>
  </section>
 );
}

export default EditReview;