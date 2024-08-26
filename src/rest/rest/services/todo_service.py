from ..database.databse import db

class TodoService:
    @staticmethod
    def get_all_todos():
        return list(db.todos.find({}, {'_id': 0}))

    @staticmethod
    def create_todo(description):
        if description:
            db.todos.insert_one({'description': description})
            return {'message': 'Todo created successfully'}
        else:
            return {'error': 'Todo description is required'}
