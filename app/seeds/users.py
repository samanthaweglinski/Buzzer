from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', profile_pic='https://cdn-icons-png.flaticon.com/512/6675/6675127.png', bio='Whats up my name is Demo-Lition but you can call me Demo', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', profile_pic='https://cdn-icons-png.flaticon.com/512/763/763755.png', bio='Purrrr', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', profile_pic='https://cdn-icons-png.flaticon.com/512/1049/1049342.png', bio='Woof', password='password')
    jack = User(
        username='jack', email='jack@aa.io', profile_pic='https://cdn-icons-png.flaticon.com/512/2395/2395796.png', bio='Mooooo', password='password')
    jill = User(
        username='jill', email='jill@aa.io', profile_pic='https://cdn-icons-png.flaticon.com/512/1960/1960025.png', bio='Oink Oink', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jack)
    db.session.add(jill)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
