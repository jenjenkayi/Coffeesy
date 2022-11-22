from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Product

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get the Current User
@user_routes.route('/current')
@login_required
def get_curr_user(id):
    pass

# Get detail of User by id


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user:
        products = Product.query.filter(Product.user_id == id)

    return user.to_dict()


# Get all Products by a UserId
@user_routes.route('/<:userId>/products')
def get_user_products(userId):
    pass