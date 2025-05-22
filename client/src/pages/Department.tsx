import React, { useState, useEffect } from 'react';

import SemesterManagement from './components/SemesterPage';
import DepartmentDashboard from './components/DeparmentPage';

const Department: React.FC = () => {

    const [view, setView] = useState<'departments' | 'semesters'>('departments');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  useEffect(() => {
    // Listen for custom navigation events
    const handleNavigateToSemesters = (event: CustomEvent<{ departmentId: string }>) => {
      setSelectedDepartmentId(event.detail.departmentId);
      setView('semesters');
    };

    window.addEventListener('navigateToSemesters', 
      handleNavigateToSemesters as EventListener);

    return () => {
      window.removeEventListener('navigateToSemesters', 
        handleNavigateToSemesters as EventListener);
    };
  }, []);

  const handleBackToDepartments = () => {
    setView('departments');
    setSelectedDepartmentId(null);
    
    // Update URL without navigation
    window.history.pushState({}, '', '/');
  };

 return(
     <main className="py-6">
        {view === 'departments' ? (
          <DepartmentDashboard />
        ) : (
          selectedDepartmentId && (
            <SemesterManagement
              departmentId={selectedDepartmentId}
              onBack={handleBackToDepartments}
            />
          )
        )}
      </main>
 )
}

export default Department;