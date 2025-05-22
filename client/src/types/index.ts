export interface Department {
  id: string;
  name: string;
  capacity: number;
  totalFaculty: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  paperCode: string;
  paperName: string;
}

export interface Semester {
  id: string;
  departmentId: string;
  name: string;
  subjects: Subject[];
  createdAt: Date;
  updatedAt: Date;
}

export type FormMode = 'add' | 'edit';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}