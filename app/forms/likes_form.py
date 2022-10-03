from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
  user_id = IntegerField("user_id", validators=[DataRequired()])
  buzz_id = IntegerField("buzz_id")
  comment_id = IntegerField("comment_id")
