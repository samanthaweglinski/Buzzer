from flask import Blueprint, request, jsonify
from app.models import db, Like, Buzz, Comment
from app.forms import LikeForm
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages


like_routes = Blueprint("likes", __name__)


@like_routes.route('/buzzes/<buzz_id>')
def get_likes(buzz_id):
  likes = Like.query.filter(Like.buzz_id == buzz_id).all()

  return { 'likes': [like.to_dict() for like in likes] }


@like_routes.route('/', methods=['POST'])
def like():
  if not current_user.is_authenticated:
    return { 'errors': ['Unauthorized, please log in']}

  form = LikeForm()

  user_id = form.data['user_id']
  buzz_id = form.data['buzz_id']
  comment_id = form.data['comment_id']

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if buzz_id and not comment_id:

      all_likes = Like.query.filter(Like.buzz_id == buzz_id).all()

      for like in all_likes:
        if like.user_id == user_id:
          return "Error: Post has already been liked by you.", 400

      buzz = Buzz.query.get(buzz_id)
      buzz.likes += 1

      new_like = Like(
        user_id = user_id,
        buzz_id = buzz_id
      )

      db.session.add(new_like)
      db.session.commit()
      return new_like.to_dict()

  elif comment_id and not buzz_id:

    all_likes = Like.query.filter(Like.comment_id == comment_id).all()

    for like in all_likes:
      if like.user_id == user_id:
        return "Error: Comment has already been liked by you."

    comment = Comment.query.get(comment_id)
    comment.likes += 1

    new_like = Like(
      user_id = user_id,
      comment_id = comment_id
    )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

  else:
    return 'Not allowed', 400


@like_routes.route('/<like_id>', methods=['DELETE'])
def remove_like(like_id):
  if not current_user.is_authenticated:
    return { 'errors': ['Unauthorized, please log in or sign up.'] }

  like = Like.query.get(like_id)

  buzz = Buzz.query.get(like.buzz_id)

  buzz.likes -= 1

  db.session.delete(like)
  db.session.commit()

  return "Successfully unliked"
