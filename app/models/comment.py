from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    buzz_id = db.Columb(db.Integer, db.ForeignKey('buzzes.id'), nullable=False)

    user = db.relationship('User', back_populates='comments')
    buzz = db.relationship('Buzz', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'buzz_id': self.buzz_id,
        }
