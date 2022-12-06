from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, db, Review
from app.forms.product_form import ProductForm
from app.forms.review_form import ReviewForm
from datetime import datetime

cart_routes = Blueprint('cart', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@cart_routes.route('/')
def get_cart_items():
    pass