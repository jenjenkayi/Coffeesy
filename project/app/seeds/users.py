from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    instance1 = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password',
        first_name = "demo",
        last_name = "user",
        profile_picture = "pic_png",
        
    )
    instance2 = User(
        username='marnie', 
        email='marnie@aa.io', 
        password='password',
        first_name = "Marnie",
        last_name = "Smith",
        profile_picture = "pic_png",
    )
    instance3 = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password',
        first_name = "Bobbie",
        last_name = "Brown",
        profile_picture = "pic_png",
    )

    db.session.add(instance1)
    db.session.add(instance2)
    db.session.add(instance3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()