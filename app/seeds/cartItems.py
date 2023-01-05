from app.models import db, CartItem, environment, SCHEMA


def seed_cartItems():
    cartItem1 = CartItem(
        user_id=1,
        product_id=2,
        quantity=1,
    )
    
    cartItem2 = CartItem(
        user_id=2,
        product_id=1,
        quantity=2,
    )
    
    cartItem3 = CartItem(
        user_id=3,
        product_id=4,
        quantity=2,
    )
    

    
    db.session.add(cartItem1)
    db.session.add(cartItem2)
    db.session.add(cartItem3)

    db.session.commit()


def undo_cartItems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
