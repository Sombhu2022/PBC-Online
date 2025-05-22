import React, { useState, useEffect } from 'react';
import { 
  getAllDepartments, 
  updateDepartment, 
  deleteDepartment,
  getSemestersByDepartmentId
} from '../../services/departmentService';
import { Department } from '../../types/index';
import DepartmentCard from '../components/DepartmentCard';
import DepartmentForm from '../components/DepartmentForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import { Plus, Layers, ChevronRight } from 'lucide-react';
import { useDepartmentStore } from '../../store/depertment';

const DepartmentDashboard: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const departmentStore = useDepartmentStore()

  useEffect(() => {
    departmentStore.fetchDepartments();
  }, []);

  console.log("----------------------" , departmentStore.departments);
  

  useEffect(() => {
    if (searchQuery) {
      const filtered = departmentStore.departments.filter(dept => 
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments(departmentStore.departments);
    }
  }, [departmentStore.departments, searchQuery]);

  const loadDepartments = () => {
    const allDepartments = getAllDepartments();
    setDepartments(allDepartments);
    setFilteredDepartments(allDepartments);
  };

  const handleAddDepartment = () => {
    setFormMode('add');
    setSelectedDepartment(undefined);
    setIsFormOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setFormMode('edit');
    setSelectedDepartment(department);
    setIsFormOpen(true);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartmentToDelete(departmentId);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteDepartment = () => {
    if (departmentToDelete) {
      deleteDepartment(departmentToDelete);
      loadDepartments();
      setIsConfirmDialogOpen(false);
      setDepartmentToDelete(null);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFormSubmit = (departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log("============== form data" , departmentData);
    
    if (formMode === 'add') {
      departmentStore.addDepartment(departmentData);
    } else if (formMode === 'edit' && selectedDepartment) {
      updateDepartment(selectedDepartment.id, departmentData);
    }
    
    loadDepartments();
    setIsFormOpen(false);
  };

  const getSemesterCount = (departmentId: string): number => {
    return getSemestersByDepartmentId(departmentId).length;
  };

  const navigateToSemesters = (departmentId: string) => {
    // In a real app, we'd use a router
    // For this demo, we'll update the URL without navigation
    window.history.pushState({}, '', `/departments/${departmentId}/semesters`);
    
    // Let parent component know to switch to semester view
    const event = new CustomEvent('navigateToSemesters', { 
      detail: { departmentId } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
          <p className="mt-1 text-gray-600">Manage your departments and related semesters</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SearchBar onSearch={handleSearch} placeholder="Search departments..." />
          
          <button
            onClick={handleAddDepartment}
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus size={18} className="mr-1.5" />
            Add Department
          </button>
        </div>
      </div>
      
      {filteredDepartments.length === 0 && searchQuery ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No departments found matching "{searchQuery}"</p>
        </div>
      ) : filteredDepartments.length === 0 ? (
        <EmptyState type="department" onAdd={handleAddDepartment} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              semesterCount={getSemesterCount(department.id)}
              onEdit={() => handleEditDepartment(department)}
              onDelete={() => handleDeleteDepartment(department.id)}
              onManageSemesters={() => navigateToSemesters(department._id)}
            />
          ))}
        </div>
      )}
      
      <DepartmentForm
        isOpen={isFormOpen}
        mode={formMode}
        department={selectedDepartment}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
      />
      
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        title="Delete Department"
        message="Are you sure you want to delete this department? This will also delete all semesters associated with this department. This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDeleteDepartment}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </div>
  );
};

export default DepartmentDashboard;