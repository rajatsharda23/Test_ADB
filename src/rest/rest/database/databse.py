import os
from pymongo import MongoClient

class Database:
    _instance = None

    @staticmethod
    def get_instance():
        if Database._instance is None:
            mongo_uri = f'mongodb://root:example@{os.environ["MONGO_HOST"]}:{os.environ["MONGO_PORT"]}'
            Database._instance = MongoClient(mongo_uri)['test_db']
        return Database._instance

db = Database.get_instance()