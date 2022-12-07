from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, db, Review, Cart
from app.forms.product_form import ProductForm
from app.forms.review_form import ReviewForm
from app.forms.cart_form import CartForm
from datetime import datetime

cart_routes = Blueprint('cartItems', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get All Cart Items of the Current User
@cart_routes.route('/current')
@login_required
def currentuser_cartitems():
    cartItems = Cart.query.filter(Cart.user_id == current_user.id)
    return jsonify({'CartItems': [cartItem.to_dict() for cartItem in cartItems]})


# Edit an Item in the Cart
@cart_routes.route('/<int:cartItemId>', methods=['PUT'])
@login_required
def edit_cartItem(cartItemId):
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cartItem = Cart.query.get(cartItemId)

    if not cartItem:
        return {"message": "Cart item not found", "statusCode": 404}
    
    if cartItem.user_id != current_user.id:
        return {"message": "You are not authorized to edit the item"}
  
    if form.validate_on_submit():
        edited_cartItem = Cart.query.get(cartItemId)
        edited_cartItem.quantity = form.data['quantity']
        edited_cartItem.created_at = datetime.now()
        db.session.commit()
    return jsonify(edit_cartItem.to_dict())

# Delete an Item in the Cart
# Method: DELETE
# URL: /api/cartItems/:cartItemId
@cart_routes.route('/<int:cartItemId>', methods=['DELETE'])
@login_required
def delete_cartItem(cartItemId):
    deleted_cartItem = Cart.query.get(cartItemId)

    if not deleted_cartItem:
        return {"message": "Item not found", "statusCode": 404}

    if deleted_cartItem.user_id != current_user.id:
        return {"message": "You are not authorized to delete the item"}

    if deleted_cartItem:
        db.session.delete(deleted_cartItem)
        db.session.commit()
    return {"message": "Item successfully deleted.", "statusCode": 200}
   

# Delete All the Items in the Cart
# Method: DELETE
# URL: /api/cartItems/current
@cart_routes.route('/current', methods=['DELETE'])
@login_required
def delete_cart():
    deleted_cart = Cart.query.all()
    
    if deleted_cart.user_id != current_user.id:
        return {"message": "You are not authorized to delete the cart"}

    if deleted_cart:
        db.session.delete(deleted_cart)
        db.session.commit()
    return {"message": "Cart successfully deleted.", "statusCode": 200}
   