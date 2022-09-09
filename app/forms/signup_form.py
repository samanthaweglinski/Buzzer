from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp, EqualTo, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Please enter a username"), Length(min=3, max=40, message="Username must be 3-40 characters long"), username_exists])
    email = StringField('email', validators=[DataRequired("Please enter your email address"), user_exists, Email("Please provide a valid email"), Length(max=40, message="Email must be less than 40 characters")])
    profile_pic = StringField('profile_pic')
    bio = StringField('bio')
    password = StringField('password', validators=[DataRequired("Please enter a password"), Length(min=8, message='Please provide a password of at least 8 characters')])
