import React, { useState, useEffect } from 'react';
import { Department, FormMode } from '../types';
import { X } from 'lucide-react';

interface DepartmentFormProps {
  isOpen: boolean;
  mode: FormMode;
  department?: Department;
  onSubmit: (department: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  isOpen,
  mode,
  department,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState<number>(0);
  const [totalFaculty, setTotalFaculty] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    capacity?: string;
    totalFaculty?: string;
    email?: string;
  }>({});

  useEffect(() => {
    if (department && mode === 'edit') {
      setName(department.name);
      setCapacity(department.capacity);
      setTotalFaculty(department.totalFaculty);
      setEmail(department.email);
    } else {
      setName('');
      setCapacity(0);
      setTotalFaculty(0);
      setEmail('');
    }
    setErrors({});
  }, [department, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      capacity?: string;
      totalFaculty?: string;
      email?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Department name is required';
    } else if (name.length < 3) {
      newErrors.name = 'Department name must be at least 3 characters';
    } else if (name.length > 60) {
      newErrors.name = 'Department name cannot exceed 60 characters';
    }
    
    if (capacity < 0) {
      newErrors.capacity = 'Capacity cannot be negative';
    }
    
    if (totalFaculty < 0) {
      newErrors.totalFaculty = 'Total faculty cannot be negative';
    }
    
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        capacity,
        totalFaculty,
        email: email.trim(),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4 transform transition-all animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Department' : 'Edit Department'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter department name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="0"
            />
            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="totalFaculty" className="block text-sm font-medium text-gray-700 mb-1">
              Total Faculty
            </label>
            <input
              type="number"
              id="totalFaculty"
              value={totalFaculty}
              onChange={(e) => setTotalFaculty(parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border ${errors.totalFaculty ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              min="0"
            />
            {errors.totalFaculty && <p className="mt-1 text-sm text-red-600">{errors.totalFaculty}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="department@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {mode === 'add' ? 'Add Department' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;