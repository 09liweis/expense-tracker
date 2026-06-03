import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from 'AppContext';
import { TODO_LIST_API } from '../constants';
import { fetchAPI } from 'helpers';
import Calendar from '@/components/todo/Calendar';
import TodoList from '@/components/todo/TodoList';
import TodoForm from '@/components/todo/TodoForm';

interface Todo {
  _id: string;
  name: string;
  status: string;
  date: string;
  is_done: boolean;
}

const TodosPage: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { isUserLoggedIn } = useContext(AppContext);

  const fetchTodos = async () => {
    const response = await fetchAPI({
      method: 'GET',
      url: TODO_LIST_API,
    });
    if (Array.isArray(response.todos)) {
      setTodos(response.todos);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoDelete = async (id: string, todoIndex: number) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${id}`,
      method: 'DELETE',
      body: {},
    });
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  const handleTodoFinish = async (todo: Todo, todoIndex: number) => {
    const todoResponse = await fetchAPI({
      url: `${TODO_LIST_API}/${todo._id}`,
      method: 'PUT',
      body: { status: 'done' },
    });
    todo.is_done = true;
    const newTodos = [...todos];
    newTodos[todoIndex] = todo;
    setTodos(newTodos);
  };

  const handleTodoSubmit = async (todo: { name: string; date: string }) => {
    const todoResponse = await fetchAPI({ 
      url: TODO_LIST_API, 
      body: { ...todo, status: 'pending' }
    });
    if (todoResponse) {
      await fetchTodos();
      setShowForm(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
        {isUserLoggedIn && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Todo</span>
          </button>
        )}
      </div>

      <Calendar />

      <TodoList
        todos={todos}
        isUserLoggedIn={isUserLoggedIn}
        onToggleTodo={handleTodoFinish}
        onDeleteTodo={handleTodoDelete}
      />

      {showForm && (
        <TodoForm
          onSubmit={handleTodoSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TodosPage;