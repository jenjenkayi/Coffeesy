from app.models import db, Product, environment, SCHEMA

def seed_products():
    product1 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=32.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Whole Beans",
        quantity=10
    )
    product2 = Product(
        user_id=2,
        name="CoffeeNerds • 4 Pack Coffee Sampler • Gourmet Coffee Gift ",
        description="This CoffeeNerds Sampler features 4 different 100% Whole Arabica Coffee Bean varieties: Nicaragua Buenos Aires San Salvador, Guatemala Huehuetenango Los Chuchitos, Colombia Planadas, El Salvador Concepcion De Ataco.",
        price=39.99,
        image="https://i.etsystatic.com/15361874/r/il/ca8c26/3745236227/il_794xN.3745236227_cbmo.jpg",
        category="Whole Beans",
        quantity=10
    )
    product3 = Product(
        user_id=3,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=22.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Whole Beans",
        quantity=10
    )
    product4 = Product(
        user_id=4,
        name="Hopped Up Coffee - Sample Pack, Beer Coffee, Specialty Coffee",
        description="Specialty coffee blended to mimic different styles of beer. This gift box lets you try all five delicious flavors! Gift box includes: 5 - 2.5 oz Kraft Bags of Hopped Up Coffee - 1 Scottish Ale, 1 Winter Warmer, 1 Chocolate Stout, 1 Black IPA, 1 Pumpkin Ale",
        price=25.99,
        image="https://i.etsystatic.com/7169689/r/il/235d5e/4184325925/il_794xN.4184325925_tqao.jpg",
        category="Whole Beans",
        quantity=15
    )
    product5 = Product(
        user_id=5,
        name="Salem's Espresso Roast Whole Beans",
        description="A pound of freshly roasted coffee beans blended for espresso. This is our in house espresso, and the coffee I drink the most of! I work hard to make each bag deliver a nice body with some toasted sweetness without the sour back end that so many espressos have.",
        price=15.00,
        image="https://i.etsystatic.com/11500191/r/il/124c41/3258849363/il_794xN.3258849363_mcm4.jpg",
        category="Whole Beans",
        quantity=15
    )
    product6 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=13.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=15
    )
    product7 = Product(
        user_id=2,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=25.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=20
    )
    product8 = Product(
        user_id=3,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=33.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=20
    )
    product9 = Product(
        user_id=4,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=35.95,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=5
    )
    product10 = Product(
        user_id=5,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=40.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=5
    )
    product11 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=26.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Pods",
        quantity=15
    )
    product12 = Product(
        user_id=2,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=17.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Pods",
        quantity=10
    )
    product13 = Product(
        user_id=3,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=18.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Pods",
        quantity=10
    )
    product14 = Product(
        user_id=4,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=19.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Pods",
        quantity=10
    )
    product15 = Product(
        user_id=5,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=22.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Pods",
        quantity=20
    )
    product16 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=21.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Drinkware",
        quantity=20
    )
    product17 = Product(
        user_id=2,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=20.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Drinkware",
        quantity=10
    )
    product18 = Product(
        user_id=3,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=23.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Drinkware",
        quantity=10
    )
    product19 = Product(
        user_id=4,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=24.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Drinkware",
        quantity=10
    )
    product20 = Product(
        user_id=5,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=25.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Drinkware",
        quantity=10
    )
    product21 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=20.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Equipment",
        quantity=10
    )
    product22 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=21.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Equipment",
        quantity=10
    )
    product23 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=50.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Equipment",
        quantity=10
    )
    product24 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=45.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Equipment",
        quantity=10
    )
    product25 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=47.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Equipment",
        quantity=10
    )
    product26 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=48.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Accessories",
        quantity=10
    )
    product27 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=49.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Accessories",
        quantity=10
    )
    product28 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=20.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Accessories",
        quantity=10
    )
    product29 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=21.50,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Accessories",
        quantity=10
    )
    product30 = Product(
        user_id=1,
        name="Organic Bourbon Barrel Roasted Medium Roast Whole Beans",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=21.99,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Accessories",
        quantity=10
    )



    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.add(product21)
    db.session.add(product22)
    db.session.add(product23)
    db.session.add(product24)
    db.session.add(product25)
    db.session.add(product26)
    db.session.add(product27)
    db.session.add(product28)
    db.session.add(product29)
    db.session.add(product30)

    
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
