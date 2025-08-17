
import React from 'react';
import { Todo } from '../types';
import Item from './Item';

interface ItemListProps {
  items: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (item: Todo) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onToggleComplete, onDelete, onEdit }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-600">No items yet!</h3>
        <p className="text-gray-500 mt-1">Add a new item to get started.</p>
      </div>
    );
  }

  return (
    <ul className="bg-white rounded-lg shadow overflow-hidden">
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default ItemList;
