
import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Modal from './components/Modal';
import { PlusIcon } from './components/Icons';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Lazy initializer to get todos from localStorage
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [
          { id: 1, text: 'Learn React', completed: true },
          { id: 2, text: 'Build a CRUD App', completed: false },
          { id: 3, text: 'Master Tailwind CSS', completed: false },
      ];
    } catch (error) {
      console.error("Could not parse todos from localStorage", error);
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddItem = (text: string) => {
    const newItem: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newItem]);
    setIsModalOpen(false);
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleUpdateItem = (updatedTodo: Todo) => {
      setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      closeModal();
  };

  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
      setIsModalOpen(false);
      setEditingTodo(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Todo List
          </h1>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            Add Item
          </button>
        </header>
        
        <main className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-lg">
           <ItemList
            items={todos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteItem}
            onEdit={openEditModal}
          />
        </main>

        <footer className="text-center mt-8 text-slate-500">
            <p>A simple yet powerful CRUD application example.</p>
        </footer>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingTodo ? 'Edit Item' : 'Add New Item'}
      >
        <ItemForm
          onSubmit={handleAddItem}
          editingItem={editingTodo}
          onUpdate={handleUpdateItem}
        />
      </Modal>
    </div>
  );
};

export default App;
