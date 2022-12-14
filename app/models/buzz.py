from .db import db
from flask_login import UserMixin


class Buzz(db.Model, UserMixin):
    __tablename__ = 'buzzes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255))

    user = db.relationship('User', back_populates='buzzes')
    comments = db.relationship('Comment', back_populates='buzzes', cascade="all, delete-orphan")
    likes = db.relationship('Like', back_populates='buzzes', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'likes': [like.to_dict() for like in self.likes],
        }
