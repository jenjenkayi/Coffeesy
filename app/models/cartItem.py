from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class CartItem(db.Model):
    __tablename__ = "cartItems"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="cartItems")
    product = db.relationship("Product", back_populates="cartItems")

    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity, 
            "createdAt": self.created_at, 
            "updatedAt": self.updated_at,
    }

    def to_dict_with_product(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity, 
            "createdAt": self.created_at, 
            "updatedAt": self.updated_at,
            "product": self.product.to_dict(),
        }

    def to_dict_with_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity, 
            "createdAt": self.created_at, 
            "updatedAt": self.updated_at,
            "user": self.user.to_dict(),
        }