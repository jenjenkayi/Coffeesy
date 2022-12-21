from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, db, Review, CartItem
from app.forms.cartItem_form import CartItemForm
from datetime import datetime

cartItem_routes = Blueprint('cartItems', __name__)

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
@cartItem_routes.route('/current')
@login_required
def currentuser_cartitems():
    cartItems = CartItem.query.filter(CartItem.user_id == current_user.id)
    return jsonify({'CartItems': [cartItem.to_dict_with_product() for cartItem in cartItems]})

# Edit an Item in the Cart
@cartItem_routes.route('/<int:cartItemId>', methods=['PUT'])
@login_required
def edit_cartItem(cartItemId):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cartItem = CartItem.query.get(cartItemId)

    if not cartItem:
        return {"message": "Cart item couldn't be found", "statusCode": 404}
    
    if cartItem.user_id != current_user.id:
        return {"message": "You are not authorized to edit the item"}
  
    if form.validate_on_submit():
        cartItem.quantity = form.data['quantity']
        cartItem.updated_at = datetime.now()
        db.session.commit()
        return jsonify(cartItem.to_dict())
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Delete an Item in the Cart
@cartItem_routes.route('/<int:cartItemId>', methods=['DELETE'])
@login_required
def delete_cartItem(cartItemId):
    deleted_cartItem = CartItem.query.get(cartItemId)

    if not deleted_cartItem:
        return {"message": "Item couldn't be found", "statusCode": 404}

    if deleted_cartItem.user_id != current_user.id:
        return {"message": "You are not authorized to delete the item"}

    if deleted_cartItem:
        db.session.delete(deleted_cartItem)
        db.session.commit()
    return {"message": "Item successfully deleted.", "statusCode": 200}
   

# Delete All the Items in the Cart
@cartItem_routes.route('/current', methods=['DELETE'])
@login_required
def delete_cart():
    cartItems = db.session.query(CartItem) \
                             .filter(CartItem.user_id == current_user.id) \
                             .all()

    if not cartItems: 
        return {'message': "Cart is empty."}

    for cartItem in cartItems:
        db.session.delete(cartItem)
    db.session.commit()
    return {"message": "Cart successfully deleted.", "statusCode": 200}
   