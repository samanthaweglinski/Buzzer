from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Buzz, Comment, Like
from .auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)


@like_routes.route("/<int:id>/", methods=["DELETE"])
@like_routes.route("/<int:id>", methods=["DELETE"])
def delete_like(id):
  like = Like.query.get(id)
  if like is not None:
    like_dict = like.to_dict()
    current_user_id = current_user.get_id()
    like_dict_id = like_dict['user_id']
    if (like_dict['user_id'] == int(current_user.get_id())):
      db.session.delete(like)
      db.session.commit()
      return{"message": "You have unliked this buzz."}
    else:
      return {"message": "You are not the owner of this like."}
  else:
    return {"message": "Like does not exist"}, 404
