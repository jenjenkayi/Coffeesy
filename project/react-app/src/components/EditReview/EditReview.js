import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { editReviewThunk, getAllReviewsThunk } from '../../store/review';
import './EditReview.css';

const EditReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();
    const { productId } = useParams();

    const user = useSelector((state) => state.session.user);
    const currentReview = useSelector(state => state.review.allReviews);
    console.log("review------", currentReview)
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    dispatch(getAllReviewsThunk(productId))
  }, [dispatch, productId])

    useEffect(() => {
        setReview(currentReview.review)
        setStars(currentReview.stars)
  }, [currentReview])

    const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);

    const data = {
        reviewId: currentReview.id,
        productId: currentReview.productId,
        review, 
        stars
    };

    if (!data.stars) return setErrors(["Please provide a star"]);
    if (!data.review.length) return setErrors(["Please provide a review"]);
    if (data.stars > 5 || data.stars < 1) return setErrors(["Stars must be between 1 to 5"]);
  
    dispatch(editReviewThunk(data)).then(() => {
        history.push(`/products/${productId}`);
        })
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        history.push(`/products/${productId}`);
    }

return (
    <>
    <div className="EditReview-Container">
      <form  onSubmit={submitHandler}>
        <h3 className="EditReview-Title">Edit A Review</h3>
        <ul className="errors">
          {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <input
            className='EditReview-Input'
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)} />
        <input
            className='EditReview-Input'
            type="number"
            value={stars}
            min="1"
            max="5"
            onChange={(e) => setStars(e.target.value)}
        />
        <button type="submit" className='EditReview-Submit-Button'>Submit</button>
        <button type="button" onClick={cancelHandler}
         className='EditReview-Cancel-Button'
        >
        Cancel
        </button>
      </form>
    </div>
    </>
  );
}

export default EditReview;