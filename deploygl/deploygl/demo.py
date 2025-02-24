from pymongo import MongoClient
from pymongo.server_api import ServerApi
import datetime
import os

    
server_name = 'mongodb+srv://huangchong:NVHYEx8HSzYHS6ra@ceair-cluster.wootsqu.mongodb.net'
client = MongoClient(server_name,server_api=ServerApi('1'))
db = client.test
a =db.books.find_one()
print(a)
