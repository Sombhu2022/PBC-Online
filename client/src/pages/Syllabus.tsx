import React, { useEffect, useState } from "react";
import SyllabusContent from "../components/syllabus/SyllabusContent";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useAuthStore } from "../store/authStore";
import { useDepartmentStore } from "../store/depertment";
import { useSyllabusStore } from "../store/syllabusStore";
import { toast } from "sonner";

const Syllabus = () => {
  const userID = useAuthStore((state) => state.user?._id || state.user?.id);

  const departments = useDepartmentStore((state) => state.departments);
  const fetchDepartments = useDepartmentStore(
    (state) => state.fetchDepartments
  );
  const selectedDepartment = useDepartmentStore(
    (state) => state.selectedDepartment
  );
  const setSelectedDepartment = useDepartmentStore(
    (state) => state.setSelectedDepartment
  );

  const semesters = useDepartmentStore((state) => state.semesters);
  const fetchSemesters = useDepartmentStore((state) => state.fetchSemesters);

  const { syllabuses, fetchSyllabuses, createSyllabus, isLoading } =
    useSyllabusStore();

  const [selectedSemester, setSelectedSemester] = useState("");
  const [paperCode, setPaperCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const departmentID = selectedDepartment?._id;

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (departmentID) {
      fetchSemesters(departmentID);
      fetchSyllabuses({ department: departmentID });
    }
  }, [departmentID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userID || !departmentID || !selectedSemester || !paperCode || !file) {
      return toast.error("All fields are required.");
    }

    const formData = new FormData();
    formData.append("user", userID);
    formData.append("department", departmentID);
    formData.append("semester", selectedSemester);
    formData.append("paperCode", paperCode);
    formData.append("document", file);

    await createSyllabus(formData);
    setIsDialogOpen(false);
    setPaperCode("");
    setSelectedSemester("");
    setFile(null);
  };

  return (
    <>
      <motion.div
        className="flex items-center justify-between px-8 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Syllabus</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button variant="outline">+ Add Syllabus</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Syllabus</DialogTitle>
              <DialogDescription>
                <form
                  className="mt-6 flex flex-col gap-5 py-3"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="w-full flex gap-4">
                    <div className="w-1/2">
                      <Label>Department</Label>
                      <Select
                        value={selectedDepartment?._id || ""}
                        onValueChange={(value) => {
                          const dept = departments.find((d) => d._id === value);
                          setSelectedDepartment(dept || null);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept._id} value={dept._id}>
                              {dept.name || "Unnamed Dept"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/2">
                      <Label>Semester</Label>
                      <Select
                        value={selectedSemester}
                        onValueChange={(val) => setSelectedSemester(val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((sem) => (
                            <SelectItem key={sem._id} value={sem._id}>
                              {sem.name ||
                                sem.title ||
                                `Semester ${sem.number || ""}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="w-full">
                    <Label>Paper Code</Label>
                    <Input
                      value={paperCode}
                      onChange={(e) => setPaperCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="w-full">
                    <Label>Upload Syllabus (PDF)</Label>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div initial="hidden" animate="show">
        {syllabuses.length === 0 ? (
          <p className="text-center text-gray-500">No syllabus found</p>
        ) : (
          <SyllabusContent syllabus={syllabuses} />
        )}
      </motion.div>
    </>
  );
};

export default Syllabus;
