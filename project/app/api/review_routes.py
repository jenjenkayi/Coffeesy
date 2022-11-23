from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
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
        return {"message": "No Reviews Found"}


# Edit a Review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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

    if deleted_review:
        db.session.delete(deleted_review)
        db.session.commit()
        return {"message": "Review successfully deleted.", "statusCode": 200}
    else:
        return {"message": "Review not found"}

