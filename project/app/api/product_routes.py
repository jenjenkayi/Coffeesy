from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, db, User
from app.forms.product_form import ProductForm
from datetime import datetime

product_routes = Blueprint('products', __name__)

# Get all Products
@product_routes.route('/')
def all_products():
    products = Product.query.all()

    if not products:
        return {"message": "Products not found"}
    return jsonify({"Products": [product.to_dict() for product in products]})


# Get details of a Product from an id
@product_routes.route('/<int:productId>')
def one_product(productId):
    product = Product.query.get(productId)


# Create a Product
@product_routes.route('/', methods=['POST'])
def create_product():
    return 


# Edit a Product
@product_routes.route('/<int:productId>', methods=['PUT'])
def edit_product():
    return 


# Delete a Product
@product_routes.route('/<int:productId>', methods=['DELETE'])
def delete_product():
    return 


# Get all Reviews by a Product's id
@product_routes.route('/<int:productId>/reviews')
def get_reviews():
    return


# Create a Review for a Product based on the Product's id
@product_routes.route('/<int:productId>/reviews', methods=['POST'])
def create_review(productId):
    return



