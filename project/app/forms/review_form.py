from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(
        max=200, message="Review must be less than 200 characters!")])
    star = IntegerField('Stars', validators=[DataRequired()])
