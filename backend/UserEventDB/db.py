from app import db,app
from datetime import datetime
from flask_login import UserMixin
import jwt

class fileRecord(db.Model):
    __tablename__ = "file_record"
    id = db.Column(db.Integer,primary_key=True,nullable=False)
    file_name = db.Column(db.String,nullable=False)
    time = db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    #event = db.relationship('EventRecord', backref=db.backref("file", lazy=True))
    def __repr__(self):
        return "<File %s>"%self.id


class User(db.Model,UserMixin):
    __tablename__ = 'users_record'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20),unique=True,nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
    confirm = db.Column(db.Boolean,nullable=False)
    admin = db.Column(db.Boolean,nullable=False)
    def __repr__(self):
        return "<user %s>"%self.username

    def generate_token(self):
        return jwt.encode({"username":self.username}, app.config["SECRET_KEY"], algorithm="HS256")

    @staticmethod
    def check_reset_password_token(token):
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            print(data)
            user = User.query.filter_by(username = data["username"]).first()
            return user
        except Exception as e:
            return str(e)

    @staticmethod
    def validate_username(username):
        if User.query.filter_by(username=username).first():
            return True
        else:
            return False

    @staticmethod
    def validate_email(email):
        if User.query.filter_by(email=email).first():
            return True
        else:
            return False




