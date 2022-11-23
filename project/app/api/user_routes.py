from flask import Blueprint, jsonify
from flask_login import login_required, current_user, login_user
from app.models import User, Product, Review
from ..models.db import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get details of User by id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user:
        products = Product.query.filter(Product.user_id == id)
        result = user.to_dict()
        result["Products"] = [product.to_dict_no_relations() for product in products]
        return result
    else:
        return {"message": "User not found", "statusCode": 404}


# Get all Products by a UserId
@user_routes.route('/<int:userId>/products')
@login_required
def get_user_products(userId):
    products = Product.query.filter(Product.user_id == userId)
    return {'Products': [product.to_dict() for product in products]}
 

# Get All Reviews by a UserId
@user_routes.route('/<int:userId>/reviews')
@login_required
def get_user_reviews(userId):
    reviews = Review.query.filter(Review.user_id == userId)
    return {'Reviews': [review.to_dict() for review in reviews]}
 


