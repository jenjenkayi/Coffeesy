from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone=True))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone=True))

    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete")

    def avgRating(self):
        if len(self.reviews) > 0:
            avg = sum(star.stars for star in self.reviews) / len(self.reviews)
            return round(avg, 2)
        else:
            return 0

    def to_dict(self):
        return {"id": self.id, "user_id": self. user_id,
                "name": self.name, "description": self.description, "price": self.price, "image": self.image, 
                "category": self.category, "quantity": self.quantity, "createdAt": self.created_at, "updatedAt": self.updated_at,
                'reviewCount': len(self.reviews), "avgRating": self.avgRating()}

    def to_dict_no_relations(self):
        return {
            "id": self.id, "user_id": self. user_id,
            "name": self.name, "description": self.description, "price": self.price, 
            "image": self.image, "category": self.category, "quantity": self.quantity,
            "createdAt": self.created_at, "updatedAt": self.updated_at
        }
