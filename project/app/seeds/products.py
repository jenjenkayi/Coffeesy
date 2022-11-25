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
        name="Coffee Sampler Pack | Ground Coffee",
        description="This sampler includes a 3 ounce bag of each of our crowd-favorite blends: Grizzly Falls (medium roast), Diamondback Espresso (medium roast), and Aspen Sunrise (light roast). Each blend is 100% Arabica, specialty grade, and small-batch roasted to ensure maximum freshness.",
        price=13.99,
        image="https://i.etsystatic.com/28934637/r/il/0887dc/3530677335/il_794xN.3530677335_rb03.jpg",
        category="Ground Coffee",
        quantity=15
    )
    product7 = Product(
        user_id=2,
        name="Artisan Chocolate Coffee | Belize Ground Coffee",
        description="Our Chocolate Coffee is locally sourced in the beautiful country of Belize. The coffee beans are ground with roasted organic cacao nibs to produce a delicious cup of coffee with a smooth chocolate finish. Belizean Bronze uses only the finest ingredients that nature has to offer us in its products. The diverse surroundings and melting pot of cultures inspire our unique and UNBELIZEABLE recipes.",
        price=25.50,
        image="https://i.etsystatic.com/9523744/r/il/0d34ab/4407459413/il_794xN.4407459413_4y1p.jpg",
        category="Ground Coffee",
        quantity=20
    )
    product8 = Product(
        user_id=3,
        name="Deluxe Coffee Sampler Gift Box with Variety of Coffee Flavors",
        description="You're giving 10 different varieties of gourmet ground coffee from our locally-owned cafe and bakery in Lima, Ohio!",
        price=55.50,
        image="https://i.etsystatic.com/12013332/r/il/ff2e4d/3260307447/il_794xN.3260307447_3y73.jpg",
        category="Ground Coffee",
        quantity=20
    )
    product9 = Product(
        user_id=4,
        name="Cold Brew World Coffee Kit, Ready to Brew in Mesh bags (Ground)",
        description="Cold Brew World Coffee kit includes three different coffees, each with a different taste profile. Perfect for people trying to learn more about cold and how coffees from different parts of the world taste!",
        price=25.95,
        image="https://i.etsystatic.com/8823634/r/il/622d9c/3018185437/il_794xN.3018185437_1ln4.jpg",
        category="Ground Coffee",
        quantity=5
    )
    product10 = Product(
        user_id=5,
        name="Coffee Lover Sampler Pack, Boxed Set of 5 Fresh-Roasted Single Origin Coffees & Blends",
        description="Try a wide range of roasts and Java Jive's unique blends with this 5 pouch sampler box. Java Jive coffees are known for their smoothness and clarity of flavor notes; furthermore, those with sensitive stomachs will find Java Jive coffees more gentle.",
        price=20.00,
        image="https://i.etsystatic.com/24721792/r/il/af470d/3941395791/il_794xN.3941395791_rvjs.jpg",
        category="Ground Coffee",
        quantity=5
    )
    product11 = Product(
        user_id=1,
        name="K- Cup Advent Calendar - Coffee Pods ARE included! | Personalized Coffee Pod Holder Snowman",
        description="This Kuerig coffee pod advent calendar is sure to bring the flavor to your home this year! Beginning on December 1st, start the countdown to Christmas with a different cup of coffee each morning. This charming piece is sure to make a cute addition to your kitchen for the holidays and is the perfect gift for any coffee-loving friend! Comes with an assortment of 24 different Keurig cups.",
        price=76.00,
        image="https://i.etsystatic.com/16336237/r/il/7f62d4/4273118519/il_794xN.4273118519_m16k.jpg",
        category="Pods",
        quantity=15
    )
    product12 = Product(
        user_id=2,
        name="Clio Coffee premium pods (Smooth Sailing, 10-pod pack)",
        description="'Peak Power' coffee blend (Dark roast) Strong Italian accent. Full-bodied aroma. Flavorful finish. Yeah, that sounds good to us. Add in hints of toasted caramel and dark chocolate and your afternoon will never be the same.",
        price=17.00,
        image="https://i.etsystatic.com/20883693/r/il/181f96/2107191810/il_794xN.2107191810_5fm5.jpg",
        category="Pods",
        quantity=10
    )
    product13 = Product(
        user_id=3,
        name="Eco Nespresso Coffee Pod Advent Calendar 2022 - UK and World first!",
        description="Featuring ethically-sourced and specialty-grade organic coffees, including a world-first coffee pod filled with Sail Ship coffee and a world first Bird Friendly® coffee in a Nespresso-compatible pod.",
        price=28.99,
        image="https://i.etsystatic.com/37299828/r/il/2ee52a/4289620983/il_794xN.4289620983_16h8.jpg",
        category="Pods",
        quantity=10
    )
    product14 = Product(
        user_id=4,
        name="Split Oak Coffee Irish Cream Gourmet Coffee, 24 Count, Single Serve Coffee Pods",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=19.99,
        image="https://i.etsystatic.com/24721792/r/il/782c24/3226080494/il_794xN.3226080494_acr8.jpg",
        category="Pods",
        quantity=10
    )
    product15 = Product(
        user_id=5,
        name="Cafe Romano Capsules Single Cup Aluminum Coffee Pods",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=25.50,
        image="https://i.ebayimg.com/images/g/BdYAAOSwscVhAa4s/s-l500.jpg",
        category="Pods",
        quantity=10
    )
    product16 = Product(
        user_id=1,
        name="Japanese Style Ceramic Espresso Cup",
        description="Handmade Japanese style ceramic tea/espresso cup with wooden handle. This cup is made with great attention to detail and is also the perfect gift for the espresso/tea lover in your life.",
        price=21.50,
        image="https://i.etsystatic.com/19763726/r/il/6a9bfc/4202559042/il_794xN.4202559042_32f6.jpg",
        category="Drinkware",
        quantity=20
    )
    product17 = Product(
        user_id=2,
        name="Speckled Stoneware Coffee Mug",
        description="Brighten the tabletop with our Speckled Stoneware Mugs. Each mug features one of four muted colors with a matte speckled finish. Whether you're enjoying your morning coffee or sipping your afternoon tea with friends, these are a must have!",
        price=20.00,
        image="https://i.etsystatic.com/10927821/r/il/ac6d8a/3543671685/il_794xN.3543671685_6kp9.jpg",
        category="Drinkware",
        quantity=10
    )
    product18 = Product(
        user_id=3,
        name="Lucky Cat Design Ceramic Mug",
        description="These mugs are made of durable pottery, premium LEAD-FREE, and can be used for dishwasher.",
        price=30.99,
        image="https://i.etsystatic.com/35276362/r/il/fb1954/4316310379/il_794xN.4316310379_j42i.jpg",
        category="Drinkware",
        quantity=10
    )
    product19 = Product(
        user_id=4,
        name="Ceramic coffee mug, handmade mug set with wood lid, coaster and mixing spoon",
        description="Nice designed pottery mug: Well designed nordic style coffee mug at right size for your coffee machine. The solid walnut coaster and lid has nice natural texture.",
        price=24.99,
        image="https://i.etsystatic.com/21210844/r/il/f0319f/3963480557/il_794xN.3963480557_gtev.jpg",
        category="Drinkware",
        quantity=10
    )
    product20 = Product(
        user_id=5,
        name="Pottery Mug, Basic coffee mug. Handmade, one-of-a-kind pottery",
        description="This is a handmade creation and there will be imperfections as opposed to machine made items. I have taken extra care and attention to make sure every vessel is functional and a beautiful addition to your home or office. Each piece is inspected thoroughly for sharp edges, perfect ease of use and functionality.",
        price=35.50,
        image="https://i.etsystatic.com/9667454/r/il/d4fe62/2631774417/il_794xN.2631774417_hype.jpg",
        category="Drinkware",
        quantity=10
    )
    product21 = Product(
        user_id=1,
        name="Wdt Tool Gift Box Espresso Stirrer Special Rosewood Espresso Distribution Tool Needle Coffee Distributor With Keychain",
        description="Espresso distribution tool is a thought gift for owners of many brands of espresso machines, which can help you to change the consistency of espresso, and suitable for daily use at home, office, coffee lovers, coffee shops, western restaurants, beverage shops and more!",
        price=20.50,
        image="https://i.etsystatic.com/37225832/r/il/7d52bd/4207980544/il_794xN.4207980544_4wel.jpg",
        category="Equipment",
        quantity=10
    )
    product22 = Product(
        user_id=2,
        name="Walnut Coffee Scoop & Espresso Tamper Set",
        description="Hand-turned walnut coffee scoop (1 Tbsp) and matching espresso tamper.",
        price=61.50,
        image="https://i.etsystatic.com/11596328/r/il/a98c02/2234165037/il_794xN.2234165037_4c72.jpg",
        category="Equipment",
        quantity=10
    )
    product23 = Product(
        user_id=3,
        name="Manual Coffee Grinder Wooden Vintage Style",
        description="This old fashioned coffee grinder is equipped with a ceramic core which is more resistant, sharper and do not rust.",
        price=50.00,
        image="https://i.etsystatic.com/36436423/r/il/a93735/4031175957/il_794xN.4031175957_mo6j.jpg",
        category="Equipment",
        quantity=5
    )
    product24 = Product(
        user_id=4,
        name="Pour Over Coffee Set - Gooseneck Kettle and Coffee Dripper Brewer for Perfect Drip Coffee",
        description="The Ariq Kettle is shaped like a volcano to pay homage to the Ampato volcano in Peru, the inspiration for our coffee gear business. It has a durable stainless steel construction with an extra black Teflon coating for longevity and extra style.",
        price=100.00,
        image="https://i.etsystatic.com/21129452/r/il/2aaec6/3552458993/il_794xN.3552458993_ea08.jpg",
        category="Equipment",
        quantity=10
    )
    product25 = Product(
        user_id=5,
        name="Milk Frother - Coffee Drink Mixer - Handheld Electric Foam Maker",
        description="A gourmet-quality milk frother that's perfect for home lattes, cappuccinos, hot chocolate and more. Get professional results for all of your favorite coffee-based drinks, milkshakes & protein drinks. Made of premium quality materials including ABS rubber and food-grade stainless steel.",
        price=30.00,
        image="https://i.etsystatic.com/14049319/r/il/bf1389/3895949132/il_794xN.3895949132_gl69.jpg",
        category="Equipment",
        quantity=10
    )
    product26 = Product(
        user_id=1,
        name="Iced Coffee Candle in Mug, Latte Candle, Nature Soy Wax & Essential Oil Candle",
        description="Super cute coffee candle, Looks and smells like real coffee!",
        price=18.00,
        image="https://i.etsystatic.com/35483182/r/il/99a167/4404274233/il_794xN.4404274233_7w4q.jpg",
        category="Accessories",
        quantity=10
    )
    product27 = Product(
        user_id=2,
        name="Floating Spilling Coffee Cup",
        description="This is a perfect gift for coffee lover or anybody that love sculpture decor. One cup will be ship chose your color.",
        price=15.50,
        image="https://i.etsystatic.com/14585603/r/il/964164/3058318415/il_794xN.3058318415_68xo.jpg",
        category="Accessories",
        quantity=10
    )
    product28 = Product(
        user_id=3,
        name="Latte Art Coffee Necklace",
        description="Aged to perfection in award winning Bear Gully Classic Reserve bourbon barrels, this 100% organic and single origin coffee is absolutely amazing. Notes of dark chocolate, oak, cream, and bourbon!",
        price=20.00,
        image="https://i.etsystatic.com/22371167/r/il/6edef3/3631025190/il_794xN.3631025190_6x0y.jpg",
        category="Accessories",
        quantity=10
    )
    product29 = Product(
        user_id=4,
        name="LIMITED-EDITION Fresh Coffee Soy Candle | Coffee Mug Candle",
        description="Our limited-edition Fresh Coffee Mug Candle smells like your favorite sweet latte without even brewing one! You will love the coffee, caramel, mocha, rum cream and sweet sugar notes as they fill your home up. It brings the best coffee shop smells into your own home.",
        price=25.50,
        image="https://i.etsystatic.com/10385964/r/il/5020a9/3710948542/il_794xN.3710948542_33gu.jpg",
        category="Accessories",
        quantity=10
    )
    product30 = Product(
        user_id=5,
        name="Coffee Latte Art Stencil Sets",
        description="Make some funny pattern on your coffee. It is made of safe and easy-clean plastic stencils. Let you enjoy a good mood when you put on the coffee cup. Great for making fancy Cappuccino's, Coffee, Latte's or Hot Chocolate 16 different design give your drinks a more attractive look!",
        price=15.99,
        image="https://i.etsystatic.com/38501045/r/il/75a8e2/4367269129/il_794xN.4367269129_k2u5.jpg",
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
