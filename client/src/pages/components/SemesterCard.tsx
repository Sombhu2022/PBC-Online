import React from 'react';
import { Semester } from '../types';
import { Edit, Trash2, Calendar, CheckCircle } from 'lucide-react';

interface SemesterCardProps {
  semester: Semester;
  onEdit: () => void;
  onDelete: () => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isCurrentSemester = (): boolean => {
    const now = new Date();
    const startDate = new Date(semester.startDate);
    const endDate = new Date(semester.endDate);
    return now >= startDate && now <= endDate;
  };

  const getStatusColor = (): string => {
    if (semester.isActive) {
      return 'bg-green-100 text-green-800';
    }
    const now = new Date();
    const startDate = new Date(semester.startDate);
    const endDate = new Date(semester.endDate);
    
    if (now < startDate) {
      return 'bg-amber-100 text-amber-800';
    } else if (now > endDate) {
      return 'bg-gray-100 text-gray-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (): string => {
    if (semester.isActive) {
      return 'Active';
    }
    const now = new Date();
    const startDate = new Date(semester.startDate);
    const endDate = new Date(semester.endDate);
    
    if (now < startDate) {
      return 'Upcoming';
    } else if (now > endDate) {
      return 'Past';
    } else {
      return 'Current';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-800">{semester.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Start: {formatDate(semester.startDate)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>End: {formatDate(semester.endDate)}</span>
          </div>
          {semester.isActive && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle size={16} className="mr-2" />
              <span>Marked as active semester</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit semester"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete semester"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SemesterCard;