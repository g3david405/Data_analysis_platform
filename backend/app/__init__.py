from flask import Flask
from flask_bcrypt import Bcrypt
from rcaFunction import RcaFunction
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from datetime import timedelta
from tensorflow.keras.models import load_model
import os

secret_key = os.environ.get("SECRET_KEY")
user = os.environ.get("USER")
password = os.environ.get("PASSWORD")
host = os.environ.get("HOST")
port = os.environ.get("PORT")
database = os.environ.get("DATABASE")
mail_user = os.environ.get("MAIL_USERNAME")
mail_password = os.environ.get("MAIL_PASSWORD")

app = Flask(__name__)
function = RcaFunction()
app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://{user}:{password}@{host}:{port}/{database}'.format(user = user, password = password, host = host, port = port, database = database)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = mail_user
app.config["MAIL_PASSWORD"] = mail_password
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
mail = Mail(app)
model = load_model('./static/my_model.h5')
from app.route import  *