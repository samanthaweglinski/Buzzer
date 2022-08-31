from flask import Blueprint, request, redirect
from app.models import db, Buzz
from app.forms import buzz_form
from flask_login import current_user

buzz_routes = Blueprint("buzzes", __name__)

# get all buzzes
@buzz_routes.route("", methods=["GET"])
@buzz_routes.route("/", methods=["GET"])
def all_buzzes():
  if (current_user):
    buzzes = Buzz.query.all()
    buzzes_dict = [buzz.to_dict() for buzz in buzzes]
    res = {"buzzes": buzzes_dict}
    return res
  else:
    return "Must be logged in to view all buzzes!"

# get a tweet by id
@buzz_routes.route("", methods=["GET"])
@buzz_routes.route("/<buzz_id>", methods=["GET"])
def one_buzz(buzz_id):
  buzz = Buzz.query.get(buzz_id)

  if not buzz:
    return "This tweet does not exist."

  return buzz.to_dict()

# create a buzz
