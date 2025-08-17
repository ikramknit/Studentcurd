
import React from 'react';
import { Todo } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface ItemProps {
  item: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (item: Todo) => void;
}

const Item: React.FC<ItemProps> = ({ item, onToggleComplete, onDelete, onEdit }) => {
  return (
    <li className="flex items-center p-4 bg-white border-b border-gray-200 group transition-shadow duration-200 hover:shadow-md">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleComplete(item.id)}
        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-grow mx-4 text-gray-700 transition-colors duration-200 ${item.completed ? 'line-through text-gray-400' : ''}`}
      >
        {item.text}
      </span>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Edit item"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Delete item"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
};

export default Item;
