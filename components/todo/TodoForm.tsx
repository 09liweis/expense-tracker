import { useState } from 'react';
import { motion } from 'motion/react';

interface TodoFormProps {
  onSubmit: (todo: { name: string; date: string }) => void;
  onClose: () => void;
}

type TodoForm = {
  name: string;
  date: string;
  title: string
}

export default function TodoForm({ onSubmit, onClose }: TodoFormProps) {
  const [todo, setTodo] = useState({ name: '', date: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(todo);
    setTodo({ name: '', date: '' });
  };

  const TODO_FIELDS:{ field: keyof TodoForm; type: string }[] = [
    {field: 'name', type: 'text', title: 'Task Name'},
    {field: 'date', type: 'date', title: 'Due Date'}
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.form 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Todo</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {TODO_FIELDS.map(({field, type, title})=>
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                {title}
              </label>
              <input
                id={field}
                type={type}
                value={todo[field]}
                onChange={(e) => setTodo({ ...todo, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your task"
                required
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Add
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}