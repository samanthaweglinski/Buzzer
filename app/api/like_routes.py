from flask import Blueprint, request, jsonify
from app.models import db, Like, Buzz, Comment
from flask_login import current_user
from .auth_routes import validation_errors_to_error_messages

like_routes = Blueprint("likes", __name__)
