from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(

    )


    db.session.add(product1)
    
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
