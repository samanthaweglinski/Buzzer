from .db import db

class Buzz(db.Model):
    __tablename__ = 'buzzes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255))
    likes = db.Column(db.Integer, default=0)

    user = db.relationship('User', back_populates='buzzes')
    comments = db.relationship('Comment', back_populates='buzzes', cascade="all, delete-orphan")
    like_list = db.relationship('Like', back_populates='buzzes', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'image_url': self.image_url,
            "likes": self.likes,
            "like_list": [like.to_dict() for like in self.like_list],
            }
