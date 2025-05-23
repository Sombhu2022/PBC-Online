// import React, { useEffect, useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Plus, RollerCoaster } from "lucide-react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";
// import { useDepartmentStore } from "../../store/depertment";
// import { useAuthStore } from "../../store/authStore";

// const AddRoutineDialog = () => {
//     const [subject, setSubject] = useState("");
//     const [teacher, setTeacher] = useState();
//     const [teacherId, setTeacherId] = useState();
//     const [classType, setClassType] = useState("");
//     const [semester, setSemester] = useState("");
//     const [day, setDay] = useState("");
//     const [time, setTime] = useState("");

//      const { fetchDepartments , fetchSemesters , setSelectedDepartment , selectedDepartment , setSelectedSemester , selectedSemester  , departments , semesters } = useDepartmentStore()
//      const { members , fetchMembersByDeptId} = useAuthStore()

//     const departmentID = selectedDepartment?._id;
  
//     useEffect(() => {
//       fetchDepartments();
//     }, []);
  
//     useEffect(() => {
//       if (departmentID) {
//         fetchSemesters(departmentID);
//       }
//     }, [departmentID]);

//     const handleAddRoutine = () => {
//         console.log("Routine Added:", {
//             subject,
//             teacher,
//             classType,
//             semester,
//             day,
//             time,
//         });

//         // Clear form after submit
//         setSubject("");
//         setTeacher("");
//         setClassType("");
//         setSemester("");
//         setDay("");
//         setTime("");
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="default" className="flex items-center gap-2">
//                     <Plus className="h-4 w-4" />
//                     Add routine
//                 </Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add Routine</DialogTitle>
//                     <DialogDescription>
//                         Fill in the routine details below.
//                     </DialogDescription>
//                 </DialogHeader>

//                 <div className="flex flex-col gap-4 py-4">
//                     <Input
//                         placeholder="Subject name"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                     />

//                     <Select
//                         value={ teacher }
//                         onValueChange={(value : any) => {
//                           console.log("------------" , value);
                          
//                           setTeacher(value );
//                           setTeacherId(value._id ?? value._id)
//                         }}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select prof" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {members?.filter(item => item.role === 'faculty').map((member) => (
//                             <SelectItem key={member._id} value={member} className="grid grid-cols-2 gap-4 items-center ">
//                                 {/* <div>
//                                <img
//                                src={member.profile_pic.url}
//                                className="h-8 w-8 rounded-full object-cover"
//                                alt={member.name}
//                                />

//                                 </div> */}
//                                <div>
//                               {member.name || "Unnamed Prof"}
//                                <p className="text-gray-600">{member.email}</p>
//                                </div>
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>

//                     <Input
//                         placeholder="Type (Lab, Lecture, etc...)"
//                         value={classType}
//                         onChange={(e) => setClassType(e.target.value)}
//                     />

//                     {/* Semester selection */}
                   
//                       <Select
//                         value={selectedDepartment?._id || ""}
//                         onValueChange={(value) => {
//                           const dept = departments.find((d) => d._id === value);
//                           setSelectedDepartment(dept || null);
//                         }}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select Department" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {departments.map((dept) => (
//                             <SelectItem key={dept._id} value={dept._id}>
//                               {dept.name || "Unnamed Dept"}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
                    
//                       <Select
//                         value={selectedSemester}
//                         onValueChange={(val) => setSelectedSemester(val)}
//                       >
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Select Semester" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {semesters.map((sem) => (
//                             <SelectItem key={sem._id} value={sem._id}>
//                               {sem.name ||
//                                 sem.title ||
//                                 `Semester ${sem.number || ""}`}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
                  

//                     {/* Day selection */}
//                     <Select
//                         value={day}
//                         onValueChange={(value) => setDay(value)}
//                     >
//                         <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select Day" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="monday">Monday</SelectItem>
//                             <SelectItem value="tuesday">Tuesday</SelectItem>
//                             <SelectItem value="wednesday">Wednesday</SelectItem>
//                             <SelectItem value="thursday">Thursday</SelectItem>
//                             <SelectItem value="friday">Friday</SelectItem>
//                             <SelectItem value="saturday">Saturday</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Input
//                         placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                     />

//                     <Button onClick={handleAddRoutine} className="w-full">
//                         Save Routine
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default AddRoutineDialog;



import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { useAuthStore } from "../../store/authStore";
import { useDepartmentStore } from "../../store/depertment";

const AddRoutineDialog = () => {
    const [subject, setSubject] = useState("");
    const [teacher, setTeacher] = useState( null);
   
    const [classType, setClassType] = useState("");
    const [semester, setSemester] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const { fetchDepartments, fetchSemesters, setSelectedDepartment, selectedDepartment, setSelectedSemester, selectedSemester, departments, semesters } = useDepartmentStore();
    const { members, fetchMembersByDeptId } = useAuthStore();

    const departmentID = selectedDepartment?._id;

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (departmentID) {
            fetchSemesters(departmentID);
        }
    }, [departmentID]);

    const handleAddRoutine = () => {
        console.log("Routine Added:", {
            subject,
            teacher,
            classType,
            semester,
            day,
            startTime,
            endTime,
        });

        // Clear form after submit
        setSubject("");
        setTeacher(null);
        setClassType("");
        setSemester("");
        setDay("");
        setStartTime("");
        setEndTime("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add routine
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Routine</DialogTitle>
                    <DialogDescription>
                        Fill in the routine details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="Subject name"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <Select
                        value={teacher}
                        onValueChange={(value) => {
                            setTeacher(value);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select prof" />
                        </SelectTrigger>
                        <SelectContent>
                            {members?.filter(item => item.role === 'faculty').map((member) => (
                                <SelectItem key={member._id} value={member} className="grid grid-cols-2 gap-4 items-center">
                                    <div>
                                        {member.name || "Unnamed Prof"}
                                        <p className="text-gray-600">{member.email}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Type (Lab, Lecture, etc...)"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    />

                    {/* Department selection */}
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

                    {/* Semester selection */}
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
                                    {sem.name || sem.title || `Semester ${sem.number || ""}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Day selection */}
                    <Select
                        value={day}
                        onValueChange={(value) => setDay(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Start and End Time Inputs */}
                    <div className="flex gap-4">
                        <Input
                            type="time"
                            placeholder="Start Time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <Input
                            type="time"
                            placeholder="End Time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleAddRoutine} className="w-full">
                        Save Routine
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddRoutineDialog;