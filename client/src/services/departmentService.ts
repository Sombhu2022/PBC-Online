import { Department, Semester } from '../types';

// In a real application, these would be API calls to a backend service
// For now, we'll use localStorage to persist data

// Department operations
export const getAllDepartments = (): Department[] => {
  const storedDepartments = localStorage.getItem('departments');
  return storedDepartments ? JSON.parse(storedDepartments) : [];
};

export const getDepartmentById = (id: string): Department | undefined => {
  const departments = getAllDepartments();
  return departments.find(dept => dept.id === id);
};

export const addDepartment = (department: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Department => {
  const departments = getAllDepartments();
  const newDepartment: Department = {
    ...department,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const updatedDepartments = [...departments, newDepartment];
  localStorage.setItem('departments', JSON.stringify(updatedDepartments));
  return newDepartment;
};

export const updateDepartment = (id: string, departmentData: Partial<Department>): Department | null => {
  const departments = getAllDepartments();
  const departmentIndex = departments.findIndex(dept => dept.id === id);
  
  if (departmentIndex === -1) return null;
  
  const updatedDepartment = {
    ...departments[departmentIndex],
    ...departmentData,
    updatedAt: new Date(),
  };
  
  departments[departmentIndex] = updatedDepartment;
  localStorage.setItem('departments', JSON.stringify(departments));
  return updatedDepartment;
};

export const deleteDepartment = (id: string): boolean => {
  const departments = getAllDepartments();
  const filteredDepartments = departments.filter(dept => dept.id !== id);
  
  if (filteredDepartments.length === departments.length) {
    return false;
  }
  
  // Delete all semesters associated with this department
  const semesters = getAllSemesters();
  const updatedSemesters = semesters.filter(sem => sem.departmentId !== id);
  localStorage.setItem('semesters', JSON.stringify(updatedSemesters));
  
  localStorage.setItem('departments', JSON.stringify(filteredDepartments));
  return true;
};

// Semester operations
export const getAllSemesters = (): Semester[] => {
  const storedSemesters = localStorage.getItem('semesters');
  return storedSemesters ? JSON.parse(storedSemesters) : [];
};

export const getSemestersByDepartmentId = (departmentId: string): Semester[] => {
  const semesters = getAllSemesters();
  return semesters.filter(sem => sem.departmentId === departmentId);
};

export const getSemesterById = (id: string): Semester | undefined => {
  const semesters = getAllSemesters();
  return semesters.find(sem => sem.id === id);
};

export const addSemester = (semester: Omit<Semester, 'id' | 'createdAt' | 'updatedAt'>): Semester => {
  const semesters = getAllSemesters();
  const newSemester: Semester = {
    ...semester,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const updatedSemesters = [...semesters, newSemester];
  localStorage.setItem('semesters', JSON.stringify(updatedSemesters));
  return newSemester;
};

export const updateSemester = (id: string, semesterData: Partial<Semester>): Semester | null => {
  const semesters = getAllSemesters();
  const semesterIndex = semesters.findIndex(sem => sem.id === id);
  
  if (semesterIndex === -1) return null;
  
  const updatedSemester = {
    ...semesters[semesterIndex],
    ...semesterData,
    updatedAt: new Date(),
  };
  
  semesters[semesterIndex] = updatedSemester;
  localStorage.setItem('semesters', JSON.stringify(semesters));
  return updatedSemester;
};

export const deleteSemester = (id: string): boolean => {
  const semesters = getAllSemesters();
  const filteredSemesters = semesters.filter(sem => sem.id !== id);
  
  if (filteredSemesters.length === semesters.length) {
    return false;
  }
  
  localStorage.setItem('semesters', JSON.stringify(filteredSemesters));
  return true;
};