from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    review1 = Review(
        user_id=1,
        product_id=2,
        review="Fast delivery, beautiful on my desk, like it very much.",
        stars=5
    )
    review2 = Review(
        user_id=1,
        product_id=3,
        review="Quite beautiful, same as the photo.",
        stars=4
    )
    review3 = Review(
        user_id=1,
        product_id=4,
        review="Fast delivery, beautiful on my desk, like it very much.",
        stars=3
    )
    review4 = Review(
        user_id=1,
        product_id=5,
        review="Very nice product and quick shipment.",
        stars=3
    )
    review5 = Review(
        user_id=1,
        product_id=6,
        review="Adorable!! Got it for a friends bday and it’s so cute.",
        stars=4
    )
    review6 = Review(
        user_id=2,
        product_id=1,
        review="Tt has a smell to it that i honestly don’t recognize, it’s not bad.",
        stars=2
    )
    review7 = Review(
        user_id=2,
        product_id=3,
        review="LOVE the candle! Looks so real!",
        stars=4
    )
    review8 = Review(
        user_id=3,
        product_id=1,
        review="This is SO CUTE!.",
        stars=4
    )
    review9 = Review(
        user_id=3,
        product_id=7,
        review="Fast delivery, beautiful on my desk, like it very much.",
        stars=5
    )
    review10 = Review(
        user_id=3,
        product_id=8,
        review="Not what I thought I had ordered.",
        stars=1
    )
    review11 = Review(
        user_id=3,
        product_id=9,
        review="Absolutely beautiful! I love these and can’t wait to use them.",
        stars=4
    )
    review12 = Review(
        user_id=4,
        product_id=10,
        review="I absolutely love it.",
        stars=5
    )
    review13 = Review(
        user_id=4,
        product_id=11,
        review="it's so beautiful and the quality is amazing.",
        stars=5
    )
    review14 = Review(
        user_id=5,
        product_id=12,
        review="This came perfectly wrapped and is SO beautiful.",
        stars=4
    )
    review15 = Review(
        user_id=1,
        product_id=13,
        review="Happy with my coffee cup! It’s beautifully made.",
        stars=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
