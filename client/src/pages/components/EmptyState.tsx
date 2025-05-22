import React from 'react';
import { FolderPlus, Calendar } from 'lucide-react';

interface EmptyStateProps {
  type: 'department' | 'semester';
  onAdd: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAdd }) => {
  const icon = type === 'department' ? (
    <FolderPlus size={48} className="text-gray-400 mb-3" />
  ) : (
    <Calendar size={48} className="text-gray-400 mb-3" />
  );

  const message = type === 'department' 
    ? 'No departments found'
    : 'No semesters found for this department';

  const description = type === 'department'
    ? 'Get started by creating your first department'
    : 'Add semesters to organize academic periods';

  const buttonText = type === 'department'
    ? 'Add Department'
    : 'Add Semester';

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg border border-dashed border-gray-300 min-h-[300px]">
      {icon}
      <h3 className="text-lg font-medium text-gray-900 mb-1">{message}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyState;