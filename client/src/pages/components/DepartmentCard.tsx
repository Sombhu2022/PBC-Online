import React from 'react';
import { Department } from '../types';
import { CalendarDays, Edit, Trash2 } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
  semesterCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onManageSemesters: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  semesterCount,
  onEdit,
  onDelete,
  onManageSemesters,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <h3 className="font-semibold text-xl text-gray-800 mb-2">{department.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{department.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <CalendarDays size={16} className="mr-1.5" />
          <span>{semesterCount} {semesterCount === 1 ? 'Semester' : 'Semesters'}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Created: {new Date(department.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Edit department"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete department"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <button
        onClick={onManageSemesters}
        className="w-full py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-sm font-medium"
      >
        Manage Semesters
      </button>
    </div>
  );
};

export default DepartmentCard;