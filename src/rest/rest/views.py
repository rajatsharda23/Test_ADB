from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

# mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
mongo_uri = 'mongodb://root:example@' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
# print(f"MongoDB URI: {mongo_uri}")
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):
    def get(self, request):
        try:
            # todos=mongo_uri
            todos = list(db.todos.find({}, {'_id': 0}))
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            error_message = str(e)
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            todo_description = request.data.get('description')
            if todo_description:
                db.todos.insert_one({'description': todo_description})
                return Response({'message': 'Todo created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Todo description is required'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            error_message = str(e)
            return Response({'error': error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)