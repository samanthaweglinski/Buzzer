from http import server
from flask import Blueprint, request, jsonify
from app.models import db, Buzz
from app.forms import buzz_form
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

buzz_routes = Blueprint("buzzes", __name__)


# get all buzzes
@buzz_routes.route("", methods=["GET"])
@buzz_routes.route("/", methods=["GET"])
# @login_required
def all_buzzes():
  if (current_user):
    buzzes = [buzz.to_dict() for buzz in Buzz.query.all()] # list comprehension
    return jsonify(buzzes)
  else:
    return "Must be logged in."

# get a buzz by id
@buzz_routes.route("/<buzz_id>", methods=["GET"])
# @login_required
def one_buzz(buzz_id):
  buzz = Buzz.query.get(buzz_id)

  if not buzz:
    return "404: This buzz does not exist."

  return jsonify(buzz.to_dict())


# create a buzz
@buzz_routes.route("", methods=["POST"])
@buzz_routes.route("/", methods=["POST"])
# @login_required
def create_buzz():
  form = buzz_form.BuzzForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  content = form.data['content']
  user_id = form.data['user_id']
  image_url = form.data['image_url']

  if form.validate_on_submit():

    buzz = Buzz(
      content = content,
      user_id=user_id,
      image_url = image_url
    )

    db.session.add(buzz)
    db.session.commit()

    return jsonify(buzz.to_dict()), 201

  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# update a buzz (edit)
@buzz_routes.route("/<buzz_id>", methods=["PUT"])
# @login_required
def update_buzz(buzz_id):
  buzz = Buzz.query.get(buzz_id)
  update = request.json

  if not buzz:
    return "404: This buzz does not exist."

  if 'content' in update.keys():
    buzz.content = update['content']
  if 'image_url' in update.keys():
    buzz.image_url = update['image_url']

  db.session.commit()
  return jsonify(buzz.to_dict()), 200


# delete a buzz
@buzz_routes.route("/<buzz_id>", methods=["DELETE"])
# @login_required
def delete_buzz(buzz_id):
  buzz = Buzz.query.get(buzz_id)

  db.session.delete(buzz)
  db.session.commit()

  return jsonify({
    'message': 'Buzz successfully deleted',
    'status_code': 200
  }), 200
