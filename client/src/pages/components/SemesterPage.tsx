import React, { useState, useEffect } from 'react';
import { 
  getDepartmentById,
  getSemestersByDepartmentId,
  addSemester,
  updateSemester,
  deleteSemester
} from '../../services/departmentService';
import { Department, Semester } from '../../types';
import SemesterCard from '../components/SemesterCard';
import SemesterForm from '../components/SemesterForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import { Plus, ArrowLeft } from 'lucide-react';
import { useDepartmentStore } from '../../store/depertment';

interface SemesterManagementProps {
  departmentId: string;
  onBack: () => void;
}

const SemesterManagement: React.FC<SemesterManagementProps> = ({
  departmentId,
  onBack,
}) => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [filteredSemesters, setFilteredSemesters] = useState<Semester[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedSemester, setSelectedSemester] = useState<Semester | undefined>(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [semesterToDelete, setSemesterToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const departmentStore = useDepartmentStore()

  useEffect(() => {
    departmentStore.fetchDepartmentById(departmentId)
    departmentStore.fetchSemesters(departmentId)
    
  }, [departmentId]);


  console.log("====================" , departmentStore.selectedDepartment);

  useEffect(()=>{
       setDepartment(departmentStore.selectedDepartment)
  } , [departmentStore.selectedDepartment])
  

  useEffect(() => {
    if (searchQuery) {
      const filtered = departmentStore.semesters.filter(sem => 
        sem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSemesters(filtered);
    } else {
      setFilteredSemesters(departmentStore.semesters);
    }
  }, [semesters, searchQuery]);

  const loadDepartment = () => {
    const dept = getDepartmentById(departmentId);
    setDepartment(dept || null);
  };

  const loadSemesters = () => {
    const departmentSemesters = getSemestersByDepartmentId(departmentId);
    setSemesters(departmentSemesters);
    setFilteredSemesters(departmentSemesters);
  };

  const handleAddSemester = () => {
    setFormMode('add');
    setSelectedSemester(undefined);
    setIsFormOpen(true);
  };

  const handleEditSemester = (semester: Semester) => {
    setFormMode('edit');
    setSelectedSemester(semester);
    setIsFormOpen(true);
  };

  const handleDeleteSemester = (semesterId: string) => {
    setSemesterToDelete(semesterId);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteSemester = () => {
    if (semesterToDelete) {
      deleteSemester(semesterToDelete);
      loadSemesters();
      setIsConfirmDialogOpen(false);
      setSemesterToDelete(null);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFormSubmit = (semesterData) => {
    if (formMode === 'add') {
      departmentStore.addSemester({
        department : semesterData.departmentId ,
        name : semesterData.name ,
        subject : semesterData.subjects
      });

    } else if (formMode === 'edit' && selectedSemester) {
      departmentStore.updateSemester(selectedSemester.id, semesterData);
    }
    
    loadSemesters();
    setIsFormOpen(false);
  };

  if (!department) {
    return <div className="text-center py-12">Department not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors focus:outline-none"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Departments
      </button>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Semesters: {department.name}
          </h1>
          <p className="mt-1 text-gray-600">
            Add and manage semesters for this department
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SearchBar onSearch={handleSearch} placeholder="Search semesters..." />
          
          <button
            onClick={handleAddSemester}
            className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus size={18} className="mr-1.5" />
            Add Semester
          </button>
        </div>
      </div>
      
      {filteredSemesters.length === 0 && searchQuery ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No semesters found matching "{searchQuery}"</p>
        </div>
      ) : filteredSemesters.length === 0 ? (
        <EmptyState type="semester" onAdd={handleAddSemester} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSemesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onEdit={() => handleEditSemester(semester)}
              onDelete={() => handleDeleteSemester(semester.id)}
            />
          ))}
        </div>
      )}
      
      <SemesterForm
        isOpen={isFormOpen}
        mode={formMode}
        departmentId={departmentId}
        semester={selectedSemester}
        onSubmit={handleFormSubmit}
        onCancel={() => setIsFormOpen(false)}
      />
      
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        title="Delete Semester"
        message="Are you sure you want to delete this semester? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDeleteSemester}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </div>
  );
};

export default SemesterManagement;