from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    review1 = Review(

    )

    db.session.add(review1)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
