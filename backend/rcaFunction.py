from xgboost.sklearn import XGBRegressor
from sklearn.model_selection import train_test_split
import numpy as np
from datetime import datetime


def DeleteOneValueCol(data):
    data_temp = data[:]
    unchange_list = []
    for item in list(data):
        if len(set(data[item])) == 1:
            unchange_list.append(item)
            del data_temp[item]
        elif set(data[item].isnull()) == {True}:
            del data_temp[item]
    return data_temp, unchange_list

class RcaFunction:
    def __init__(self):
        self.name = "RcaFunction"

    def DeleteOneValueCol(self,data):
        data_temp = data[:]
        unchange_list = []
        for item in list(data):
            if len(set(data[item])) == 1:
                unchange_list.append(item)
                del data_temp[item]
            elif set(data[item].isnull()) == {True}:
                del data_temp[item]
        return data_temp, unchange_list

    def modeling(self,data_x,data_y,test_size = 0.2):
        train_X, test_X, train_y, test_y = train_test_split(data_x,
                                                            data_y,
                                                            test_size=test_size)
        model = XGBRegressor()
        model.fit(train_X,train_y)
        y_pred = model.predict(test_X)
        confidence = model.score(test_X,test_y)
        importances = model.feature_importances_
        parameter_importance = []
        for index, item in enumerate(list(train_X)):
            temp_dict = {}
            temp_dict["variable"] = item
            temp_dict["featureImportance"] = round(np.float(importances[index]),2)
            temp_dict["max"] = round(np.float(max(data_x[item])),2)
            temp_dict["min"] = round(np.float(min(data_x[item])),2)
            temp_dict["avg"] = round(np.mean(data_x[item]),2)
            temp_dict["std"] = round(np.std(data_x[item]),2)
            parameter_importance.append(temp_dict)
        parameter_importance = sorted(parameter_importance, key=lambda x: x["featureImportance"], reverse=True)
        y_pred = y_pred.tolist()
        '''
        for index,item in enumerate(parameter_importance):
            col = item[0]
            col_max = max(data_x[col])
            col_min = min(data_x[col])
            col_avg = np.mean(data_x[col])
            col_std = np.std(data_x[col])
            parameter_importance[index].append(round(col_max,2))
            parameter_importance[index].append(round(col_min,2))
            parameter_importance[index].append(round(col_avg,2))
            parameter_importance[index].append(round(col_std,2))
        '''
        #parameter_importance = np.array(parameter_importance).tolist()
        #print(parameter_importance)
        return confidence,parameter_importance,y_pred,list(test_y)

    def dataPreprocessing(self,data,startTime,endTime,objective,product):
        data_time_format = "[%Y.%m.%d %H:%M:%S]"
        data["Timer"] = [datetime.strptime(item,data_time_format) for item in data["Timer"]]
        data = data[(data['Timer'] > startTime) & (data["Timer"] < endTime)]
        #data_substrate_id = data[(data['FULLGLASSID'].notnull()) & (data['MainShutteri'] == 1)]
        #data_substrate_id = data[[item for item in list(data_substrate_id) if source in item]]
        data = data[data["產品"] == product]
        data_del_col, unchange = DeleteOneValueCol(data)
        data_del_col = data_del_col.reset_index(drop=True)
        data_y = data_del_col[objective]
        data_x = data_del_col[:]
        return data_x,data_y

    def visualization(self,data,target):
        feature_list = []
        for item in list(data):
            if item != target:
                temp_dict = {}
                temp_dict["name"] = item
                temp_dict["values"] = list(data[item])
                feature_list.append(temp_dict)
        corr = data.corr()
        corr_list = []
        for i in list(corr):
            corr_list.append(list(corr[i]))
        return feature_list,corr_list

    def changeSource(self,source):
        source_dict = {"Src1": "S1",
                       "Src2": "S2",
                       "Src3": "S3",
                       "Src4": "S4"}
        source_output = source_dict[source]
        return source_output

    def changeTimeFormat(self,startDate,startHour,endDate,endHour):
        startTime = startDate + startHour
        dateFormatter = "%Y-%m-%d%H:%M"
        startTime = datetime.strptime(startTime,dateFormatter)
        endTime = endDate + endHour
        endTime = datetime.strptime(endTime,dateFormatter)
        return startTime,endTime
