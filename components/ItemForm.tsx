
import React, { useState, useEffect } from 'react';
import { Todo } from '../types';

interface ItemFormProps {
  onSubmit: (text: string) => void;
  editingItem: Todo | null;
  onUpdate: (item: Todo) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, editingItem, onUpdate }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingItem) {
      setText(editingItem.text);
    } else {
      setText('');
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingItem) {
      onUpdate({ ...editingItem, text });
    } else {
      onSubmit(text);
    }
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Learn about React Hooks"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
        autoFocus
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        {editingItem ? 'Save Changes' : 'Add Item'}
      </button>
    </form>
  );
};

export default ItemForm;
