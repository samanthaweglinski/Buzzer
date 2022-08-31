from app.models import db
from app.models.comment import Comment


def seed_comments():
    c1 = Comment(
        content='Welcome!', user_id=2, buzz_id=1)
    c2 = Comment(
        content='what color was it? i may have seen one...', user_id=3, buzz_id=2)
    c3 = Comment(
        content='......uhhhh.......', user_id=4, buzz_id=3)
    c4 = Comment(
        content='agreed!', user_id=5, buzz_id=4)
    c5 = Comment(
        content='Just went to Italy last year, it was great!', user_id=1, buzz_id=5)
    c6 = Comment(
        content='hope to see you there!', user_id=5, buzz_id=6)
    c7 = Comment(
        content='LOL', user_id=1, buzz_id=7)
    c8 = Comment(
        content="personally i don't mind him...", user_id=2, buzz_id=8)
    c9 = Comment(
        content='Carpool?', user_id=3, buzz_id=9)
    c10 = Comment(
        content='take deep breaths!', user_id=4, buzz_id=10)

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)
    db.session.add(c7)
    db.session.add(c8)
    db.session.add(c9)
    db.session.add(c10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
