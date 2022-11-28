from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db, Product
from app.forms.review_form import ReviewForm
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

# Get all Reviews of the Current User
@review_routes.route('/current')
@login_required
def get_curr_reviews():
    reviews = Review.query.filter(Review.user_id == current_user.id)

    if reviews:
        return {'Reviews': [review.to_dict() for review in reviews]}

    else:
        return {"message": "No Reviews Found", "statusCode": 404}

# Get a Review by review id
@review_routes.route('/<int:reviewId>')
def get_one_review(reviewId):
    review = Review.query.get(reviewId)
    if review:
        return jsonify(review.to_dict())
    # else:
    #     return {"message": "Review Not Found", "statusCode": 404}


# Edit a Review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.get(reviewId)

    if not review:
        return {"message": "Review not found", "statusCode": 404}
    
    if review.user_id != current_user.id:
        return {"message": "You are not authorized to edit the review"}

    if form.validate_on_submit():
        data = form.data
        edited_review = Review.query.get(reviewId)
        edited_review.review = data['review']
        edited_review.stars = data['stars']
        edited_review.updatedAt = datetime.now()
        db.session.commit()
        return jsonify(edited_review.to_dict())


# Delete a Review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    deleted_review = Review.query.get(reviewId)

    if not deleted_review:
        return {"message": "Review not found", "statusCode": 404}

    if deleted_review.user_id != current_user.id:
        return {"message": "You are not authorized to delete the review"}

    if deleted_review:
        db.session.delete(deleted_review)
        db.session.commit()
    return {"message": "Review successfully deleted.", "statusCode": 200}
