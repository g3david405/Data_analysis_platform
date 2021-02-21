import pymongo


class mongoDB():
    def __init__(self, ip, db, collection_name):
        self.client = pymongo.MongoClient(ip)
        self.collection = self.client[db][collection_name]

    def insert(self, content):
        self.collection.insert_one(content)

    def query_by_limit(self, N):
        query = list(self.collection.find().limit(N))
        return query

    def query(self):
        query = list(self.collection.find())
        return query

    def query_by_limit_from_last(self, N):
        query = list(self.collection.find().limit(N).sort('_id', -1))
        return query

    def find_by_value(self, key, value1, value2):
        query = list(self.collection.find({key: {'$gte': value1, '$lte': value2}}))
        return query