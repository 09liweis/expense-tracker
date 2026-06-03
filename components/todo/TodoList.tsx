import { motion } from 'motion/react';

interface Todo {
  _id: string;
  name: string;
  status: string;
  date: string;
  is_done: boolean;
}

interface TodoListProps {
  todos: Todo[];
  isUserLoggedIn: boolean;
  onToggleTodo: (todo: Todo, index: number) => void;
  onDeleteTodo: (id: string, index: number) => void;
}

export default function TodoList({ 
  todos, 
  isUserLoggedIn, 
  onToggleTodo, 
  onDeleteTodo 
}: TodoListProps) {
  return (
    <div className="space-y-3 mt-6">
      {todos.map((todo, index) => (
        <motion.article
          key={todo._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg shadow-xs border border-gray-100 p-4 flex items-center justify-between hover:border-blue-500 transition-all"
        >
          <div className="flex items-center space-x-3">
            {isUserLoggedIn && (
              <button
                onClick={() => onToggleTodo(todo, index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${todo.is_done 
                    ? 'border-green-500 bg-green-500 text-white' 
                    : 'border-gray-300 hover:border-green-500'
                  }`}
              >
                {todo.is_done && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )}
            <span className={`text-gray-800 ${todo.is_done ? 'line-through text-gray-500' : ''}`}>
              {todo.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {new Date(todo.date).toLocaleDateString()}
            </span>
            {isUserLoggedIn && (
              <button
                onClick={() => onDeleteTodo(todo._id, index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}