from flask import request,session,render_template,redirect
import json
import cv2
from datetime import datetime
import pandas as pd
from DataDB.db import mongoDB
from rcaFunction import RcaFunction
from UserEventDB.db import User
from app import app,db,bcrypt,mail,model
from flask_mail import Message
from threading import Thread
import numpy as np

function = RcaFunction()


def send_async_mail(msg):
    with app.app_context():
        mail.send(msg)

def send_mail(user,token):
    msg = Message("Hello",
                  sender=app.config["MAIL_USERNAME"],
                  recipients=[user.email],
                  html=render_template("user_confirm.html", user=user.username, token=token)
                  )
    Thread(target=send_async_mail,args=(msg,)).start()


@app.route("/test")
def testfor():
    return {"result":"101"}


@app.route("/")
def test():
    db.create_all()
    db.session.commit()
    return {"success":"101"}


@app.route("/user_confirm/<token>")
def userConfirm(token):
    try:
        user = User.check_reset_password_token(token=token)
        user.confirm = True
        db.session.add(user)
        db.session.commit()
        return redirect("http://localhost:3000/")
    except:
        return "錯誤，用戶不存在"


@app.route("/add_user", methods=["POST"])
def addUser():
    req = request.get_json(force=True)
    print(req)
    username = req["username"]
    password = bcrypt.generate_password_hash(req["password"]).decode("utf-8")
    email = req["email"]
    validateUser = User.validate_username(username)
    validateEmail = User.validate_email(email)
    if validateEmail:
        return {"success":'400','message':"信箱已使用"}
    if validateUser:
        return {"success":'400','message': "用戶名已使用"}
    if username == "David":
        user = User(username=username, password=password, email=email, confirm=False, admin=True)
    else:
        user = User(username=username,password=password,email=email,confirm=False,admin=False)
    db.session.add(user)
    token = user.generate_token()
    send_mail(user, token)
    db.session.commit()
    return {"success":'100'}

@app.route("/login",methods=["POST"])
def login():
    req = request.get_json(force = True)
    username = req["username"]
    password = req["password"]
    user = User.query.filter_by(username=username).first()
    if user:
        check = bcrypt.check_password_hash(user.password, password)
        if check:
            session.permanent = True
            return {"success": 100,"username":user.username,'confirm':user.confirm,'admin':user.admin}
        else:
            return {"success" : 400, "message":"密碼錯誤"}
    return {"success" : 400, "message" : "找不到使用者"}

@app.route('/Modeling',methods=["POST"])
def Modeling():
    #description = request.form["detail"]
    req = request.get_json(force = True)
    product = req["product"]
    collection = req["collection"]
    objective = req["source"]
    startDate = req["startDate"]
    startHour = req["startHour"]
    endDate = req["endDate"]
    endHour = req["endHour"]
    startTime,endTime = function.changeTimeFormat(startDate,startHour,endDate,endHour)
    #mongo = mongoDB('mongodb://10.136.216.3:30833/', 'RCADavid', collection)
    mongo = mongoDB('mongodb://127.0.0.1:27017/', 'David', collection)
    data = pd.DataFrame(list(mongo.collection.find()))
    #OC = data["FULLMASKID"][0][:3]
    data_x,data_y = function.dataPreprocessing(data,startTime,endTime,objective,product)
    if len(data_x) < 100:
        return {"success":"400","message":"data not enough"}
    del_col = ["Timer","產品","目標參數A","目標參數B",'_id']
    for col in del_col:
        try:
            del data_x[col]
        except:
            print(col)
    print(data_x)
    print(data_y)
    confidence,parameter_importance,y_pred,test_y = function.modeling(data_x,data_y,test_size=0.2)
    '''
    event = pd.DataFrame({"confidence":[round(confidence,2)],
                           "collection":[collection],
                           "DataLen":[len(data_x)],
                           "OC":[OC],
                           "Source":[source],
                           "Description":[description],
                           })
    event = json.loads(event.T.to_json()).values()
    mongo_event.collection.insert(event)
    '''
    return {"success":"100",
            "lenData":len(data_x),
            "confidence":round(confidence,2),
            "plotPredict": {"predict":y_pred,"true":test_y},
            "featureImportance":parameter_importance,
            }

@app.route("/Dashboard",methods=["POST"])
def dashbaord():
    req = request.get_json(force=True)
    collection = req["collection"]
    featureList = req["featureList"]
    startDate = req["startDate"]
    startHour = req["startHour"]
    endDate = req["endDate"]
    endHour = req["endHour"]
    targetVariable = req["source"]
    product = req["product"]
    print(targetVariable)
    startTime,endTime = function.changeTimeFormat(startDate,startHour,endDate,endHour)
    featureList.append(targetVariable)
    featureList.append("產品")
    mongo = mongoDB('mongodb://127.0.0.1:27017/', 'David', collection)
    #mongo = mongoDB('mongodb://10.136.216.3:30833/', 'RCADavid', collection)
    #mongo = mongoDB('mongodb://10.136.154.6:9997/', 'WSI', collection)
    data = pd.DataFrame(list(mongo.collection.find()))
    #data = data[(data['FULLGLASSID'].notnull()) & (data['MainShutteri'] == 1)]
    #featureList = np.array(featureList).tolist()
    data = data[featureList]
    data = data[data["產品"] == product]
    featureList.remove(targetVariable)
    featureList.remove("產品")
    feature_list,corr_list = function.visualization(data,targetVariable)
    featureList.append(targetVariable)
    return {"success": "100",
            "corrMatrix":corr_list,
            "targetValue":[{"name":targetVariable,"values":list(data[targetVariable])}],
            "featureValue":feature_list,
            "featureList":featureList,
            "tree":{}
            }


@app.route("/saveExcel",methods=["POST"])
def saveExcel():
    time = datetime.now()
    dt_string = time.strftime("%d/%m/%Y %H:%M:%S")
    #mongo = mongoDB('mongodb://10.136.216.3:30833/', 'RCADavid', str(dt_string))
    mongo = mongoDB('mongodb://127.0.0.1:27017/', 'David', str(dt_string))
    #mongo = mongoDB('mongodb://10.136.154.6:9997/', 'WSIData', str(dt_string))
    file = request.files["files"]
    filename = request.form["filename"]
    if ".xls" in filename:
        data = pd.read_excel(file)
    elif ".csv" in filename:
        data = pd.read_csv(file)
    rename_dict={}
    for col in list(data):
        if "." in col:
            text = col.replace(".","")
            rename_dict[col] = text
            print(col)
    data = data.rename(columns=rename_dict)
    #OC = data["FULLMASKID"][0][:3]
    startTime = data["Timer"][0]
    startTime = startTime.split(" ")
    startDate = startTime[0].strip("[").replace(".","-")
    startHour = startTime[1].strip("]")[:2]
    endTime = list(data["Timer"])[-1]
    endTime = endTime.split(" ")
    endDate = endTime[0].strip("[").replace(".","-")
    endHour = endTime[1].strip("]")[:2]
    record = json.loads(data.T.to_json()).values()
    #print(OC)
    mongo.collection.insert(record)
    print("success")
    return {"success": "100",
            "collection":str(dt_string),
            'featureList':[item for item in list(data) if "生產參數" in item],
            "objectiveList":[item for item in list(data) if "目標參數" in item],
            "productList":list(np.unique(data["產品"])),
            #"dataTime":{"startDate":[startDate],"startHour":[startHour+":00"],"endDate":[endDate],"endHour":[endHour+":00"]},
            "dataTime":[startDate,startHour+":00",endDate,endHour+":00"],
            #"OC":OC
            }


@app.route("/GetEvent")
def getEvent():
    try:
        mongo_event = mongoDB("mongodb://127.0.0.1:27017/", "event", "dataRecord")
        dataRecord = pd.DataFrame(list(mongo_event.collection.find()))
        timeFormat = "%d/%m/%Y %H:%M:%S"
        dataRecord["collection"] = [datetime.strptime(item,timeFormat).strftime("%Y-%m-%d %H:%M:%S") for item in dataRecord["collection"]]
        return {
            "success":"100",
            "result":{
            "Confidence":list(dataRecord["confidence"]),
            "Collection":list(dataRecord["collection"]),
            "DataLen":list(dataRecord["DataLen"]),
            "OC": list(dataRecord["OC"]),
            "Source": list(dataRecord["Source"]),
            "Description":list(dataRecord["Description"]),
        }}
    except Exception as e:
        return {"success": "400", "message": str(e)}

@app.route("/checkConfirm",methods=["POST"])
def checkConfirm():
    req = request.get_json(force = True)
    username = req["username"]
    user = User.query.filter_by(username = username).first()
    return {"confirm":user.confirm,"success":"100"}

@app.route("/classification",methods=["POST"])
def classification():
    image = request.files["image"].read()
    trueClass = request.form["trueClass"]
    npimg = np.fromstring(image, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    img_size = 128
    #img = cv2.imread(image)
    img = cv2.resize(img, (img_size, img_size), cv2.INTER_LINEAR) / 255
    x = model(img.reshape((1, img_size, img_size, 3)))
    test_pred = np.argmax(x)
    classes = ["狗狗", "貓貓"]
    print(x.numpy()[0])
    if x.numpy()[0][test_pred] < 0.95:
        if trueClass == "都不是":
            return {"success" : '100', "class" : "都不是","correct":True}
        else:
            return {"success" : '100', "class" : "都不是","correct":False}
    if trueClass == classes[test_pred]:
        return {"success":'100', "class":classes[test_pred],"correct":True}
    else:
        return {"success": '100', "class": classes[test_pred], "correct": False}

@app.route("/userList")
def getUser():
    result = db.engine.execute("SELECT * FROM users_record")
    data_query = pd.DataFrame(result, columns=result.keys())
    list_return = []

    for i in range(len(data_query)):
        if data_query["confirm"][i]:
            confirm = "已驗證"
        else:
            confirm = "未驗證"
        if data_query["admin"][i]:
            admin = "是"
        else:
            admin = "否"
        list_return.append({
            "username":data_query["username"][i],
            "email":data_query["email"][i],
            "confirm":confirm,
            "admin":admin
        })

    return {"success":"100","result":list_return}

@app.route("/deleteUser",methods=["POST"])
def deleteUser():
    req = request.get_json(force=True)
    deleteList = req["selectedUser"]
    for username in deleteList:
        user = User.query.filter_by(username = username).first()
        db.session.delete(user)
        db.session.commit()
    return {"success":"100"}

@app.route("/adminUser",methods=["POST"])
def adminUser():
    req = request.get_json(force=True)
    adminList = req["selectedUser"]
    for username in adminList:
        user = User.query.filter_by(username = username).first()
        user.admin = True
        db.session.add(user)
        db.session.commit()
    return {"success": "100"}



