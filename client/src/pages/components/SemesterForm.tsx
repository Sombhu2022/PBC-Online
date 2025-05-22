import React, { useState, useEffect } from 'react';
import { Semester, Subject, FormMode } from '../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface SemesterFormProps {
  isOpen: boolean;
  mode: FormMode;
  departmentId: string;
  semester?: Semester;
  onSubmit: (semester: Omit<Semester, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const SemesterForm: React.FC<SemesterFormProps> = ({
  isOpen,
  mode,
  departmentId,
  semester,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    subjects?: string;
  }>({});

  useEffect(() => {
    if (semester && mode === 'edit') {
      setName(semester.name);
      setSubjects(semester.subjects);
    } else {
      setName('');
      setSubjects([]);
    }
    setErrors({});
  }, [semester, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      subjects?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Semester name is required';
    } else if (name.length < 3) {
      newErrors.name = 'Semester name must be at least 3 characters';
    } else if (name.length > 15) {
      newErrors.name = 'Semester name cannot exceed 15 characters';
    }
    
    const hasInvalidSubjects = subjects.some(
      subject => 
        !subject.paperCode.trim() || 
        !subject.paperName.trim() ||
        subject.paperCode.length < 3 ||
        subject.paperCode.length > 15 ||
        subject.paperName.length < 3 ||
        subject.paperName.length > 30
    );
    
    if (hasInvalidSubjects) {
      newErrors.subjects = 'Please check subject details. Paper code must be 3-15 characters and paper name must be 3-30 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { paperCode: '', paperName: '' }]);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        departmentId,
        name: name.trim(),
        subjects: subjects.map(subject => ({
          paperCode: subject.paperCode.trim(),
          paperName: subject.paperName.trim(),
        })),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full mx-4 transform transition-all animate-fade-in overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Semester' : 'Edit Semester'}
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
              Semester Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., Semester 1"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">Subjects</label>
              <button
                type="button"
                onClick={handleAddSubject}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
              >
                <Plus size={16} className="mr-1" />
                Add Subject
              </button>
            </div>
            
            {subjects.map((subject, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Subject {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Code
                    </label>
                    <input
                      type="text"
                      value={subject.paperCode}
                      onChange={(e) => handleSubjectChange(index, 'paperCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., CS101"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Name
                    </label>
                    <input
                      type="text"
                      value={subject.paperName}
                      onChange={(e) => handleSubjectChange(index, 'paperName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Introduction to Programming"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {errors.subjects && (
              <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>
            )}
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
              {mode === 'add' ? 'Add Semester' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemesterForm;