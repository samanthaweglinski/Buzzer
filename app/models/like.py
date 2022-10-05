from .db import db
from flask_login import UserMixin

class Like(db.Model, UserMixin):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  buzz_id = db.Column(db.Integer, db.ForeignKey('buzzes.id'))

  user = db.relationship('User', back_populates='likes', foreign_keys=[user_id])
  buzzes = db.relationship('Buzz', back_populates='likes', foreign_keys=[buzz_id])

  @property
  def comment_details(self):
      return self.to_dict()

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'buzz_id': self.buzz_id,
      }
