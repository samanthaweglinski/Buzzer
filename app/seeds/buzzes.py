from app.models import db
from app.models.buzz import Buzz


def seed_buzzes():
    b1 = Buzz(
        content='first Buzz omg!', user_id=1, image_url='')
    b2 = Buzz(
        content='i lost my ball of yarn ugh', user_id=2, image_url='https://qph.cf2.quoracdn.net/main-qimg-604513a062d18627bd3d40b04c34b6ed-lq')
    b3 = Buzz(
        content='Mmmm... steak...', user_id=3, image_url='')
    b4 = Buzz(
        content='chick fil a is so good', user_id=4, image_url='https://media-cdn.tripadvisor.com/media/photo-s/1a/42/ae/a6/photo2jpg.jpg')
    b5 = Buzz(
        content='Need to go on vacation, ASAP!', user_id=5, image_url='')
    b6 = Buzz(
        content='anyone going to jills birthday party this week?', user_id=1, image_url='')
    b7 = Buzz(
        content='If I fits I sits', user_id=2, image_url='https://cff2.earth.com/uploads/2018/08/09145053/Cats-loves-boxes-because-the-confined-space-makes-them-feel-safe.jpg')
    b8 = Buzz(
        content='the mailman is the worst', user_id=3, image_url='')
    b9 = Buzz(
        content='cant wait for jills birthday party this weekend!', user_id=4, image_url='')
    b10 = Buzz(
        content='ugh, SO STRESSED!', user_id=5, image_url='')


    db.session.add(b1)
    db.session.add(b2)
    db.session.add(b3)
    db.session.add(b4)
    db.session.add(b5)
    db.session.add(b6)
    db.session.add(b7)
    db.session.add(b8)
    db.session.add(b9)
    db.session.add(b10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_buzzes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
