from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange

category_choices = ["Whole Bean", "Ground Coffee", "Pods", "Drinkware", "Equipment", "Accessories"]
quantity_choices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(
        max=200, message="Name must be less than 200 characters!")])
    description = StringField('Description', validators=[DataRequired(), Length(
        max=500, message="Name must be less than 500 characters!")])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=0, message="Pirce must be greater than $0")])
    image = StringField('Image', validators=[DataRequired()])
    category = SelectField('Category', choices=category_choices, validators=[DataRequired()])
    quantity = SelectField('Quantity', choices=quantity_choices, validators=[DataRequired(), NumberRange(min=1, message="Quantity must be greater than 1")])