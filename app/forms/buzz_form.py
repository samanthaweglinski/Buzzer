from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class BuzzForm(FlaskForm):
  content = StringField("content", validators=[DataRequired()])
  user_id = IntegerField("user_id", validators=[DataRequired()])
  image_url = StringField("image_url")
