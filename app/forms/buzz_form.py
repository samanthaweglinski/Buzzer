from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class BuzzForm(FlaskForm):
  content = StringField("content", validators=[DataRequired("Buzz must have content"), Length(max=280, message="Buzz must be no more than 280 characters")])
  user_id = IntegerField("user_id", validators=[DataRequired()])
  image_url = StringField("image_url")
