from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, db, Review
from app.forms.product_form import ProductForm
from app.forms.review_form import ReviewForm
from datetime import datetime

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


# Get all Products
@product_routes.route('/')
def all_products():
    products = Product.query.all()

    if not products:
        return {"message": "No Products found", "statusCode": 404}
    return jsonify({"Products": [product.to_dict() for product in products]})


# Get details of a Product from an id
@product_routes.route('/<int:productId>')
def single_product(productId):
    product = Product.query.get(productId)
    if product:
        return jsonify(product.to_dict())
    else:
        return {"message": "Product not found", "statusCode": 404}


# Get Current User's products
@product_routes.route('/current')
@login_required
def currentuser_products():
    products = Product.query.filter(Product.user_id == current_user.id)
    return jsonify({'Products': [product.to_dict() for product in products]})


# Create a Product
@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            user=current_user,
            name = form.data['name'],
            description = form.data['description'],
            price = form.data['price'],
            image = form.data['image'],
            category = form.data['category'],
            quantity = form.data['quantity'],
            created_at = datetime.now(),
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
 

# Edit a Product
@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def edit_product(productId):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get(productId)

    if not product:
        return {"message": "Product not found", "statusCode": 404}
    
    if product.user_id != current_user.id:
        return {"message": "You are not authorized to edit the product"}
  
    if form.validate_on_submit():
        edited_product = Product.query.get(productId)
        edited_product.name = form.data['name']
        edited_product.description = form.data['description']
        edited_product.price = form.data['price']
        edited_product.image = form.data['image']
        edited_product.category = form.data['category']
        edited_product.quantity = form.data['quantity']
        edited_product.created_at = datetime.now()
        db.session.commit()
    return jsonify(edited_product.to_dict())


# Delete a Product
@product_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_product(productId):
    deleted_product = Product.query.get(productId)

    if not deleted_product:
        return {"message": "Product not found", "statusCode": 404}

    if deleted_product.user_id != current_user.id:
        return {"message": "You are not authorized to delete the product"}

    if deleted_product:
        db.session.delete(deleted_product)
        db.session.commit()
    return {"message": "Product successfully deleted.", "statusCode": 200}
   

# Get all Reviews by a Product's id
@product_routes.route('/<int:productId>/reviews')
def get_reviews(productId):
    reviews = Review.query.filter(Review.product_id == productId).all()
    if not reviews:
        return {"Reviews": []}
    return jsonify({"Reviews": [review.to_dict_with_user() for review in reviews]})


# Create a Review for a Product based on the Product's id
@product_routes.route('/<int:productId>/review', methods=['POST'])
def create_review(productId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product.query.get(productId)
        new_review = Review(
            user = current_user,
            product_id = productId,
            review = form.data['review'],
            stars = form.data['stars'],
            created_at = datetime.now()
        )
        
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route('/<keyword>')
def search_product(keyword):
    products = Product.query.filter(Product.name.ilike(f"%{keyword}%")).all()
    return jsonify({'Products': [product.to_dict() for product in products]})


