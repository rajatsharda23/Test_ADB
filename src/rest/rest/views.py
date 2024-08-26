from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.todo_service import TodoService

class TodoListView(APIView):
    def get(self, request):
        try:
            todos = TodoService.get_all_todos()
            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            todo_description = request.data.get('description')
            result = TodoService.create_todo(todo_description)
            if 'error' in result:
                return Response(result, status=status.HTTP_400_BAD_REQUEST)
            return Response(result, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
