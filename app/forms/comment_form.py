from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
  content = StringField("content", validators=[DataRequired("Comment must have content"), Length(max=280, message="Comment must be no more than 280 characters")])
  user_id = IntegerField("user_id", validators=[DataRequired()])
  buzz_id = IntegerField("buzz_id", validators=[DataRequired()])
