import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Plus } from "lucide-react";
import RoutineBox from "../components/routine/RoutineBox";
import AddRoutineDialog from "../components/routine/AddroutineDialogue";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";

const Routines = () => {
    const role: string | null = useAuthStore((state) => state.role);
    // const role: string | null = 'student';

    const [semester, setSemester] = useState<string>("first");

    return (
        <section className="container flex flex-col gap-4">
            {/* Animate the header */}
            <motion.div
                className="flex flex-row items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-2xl font-semibold">Routines</h1>
                    <p>Department</p>
                </div>
                <div className="flex flex-row gap-3 items-center justify-center">
                    <Select
                        value={semester}
                        onValueChange={(value) => setSemester(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="first">1st Sem</SelectItem>
                            <SelectItem value="second">2nd Sem</SelectItem>
                            <SelectItem value="third">3rd Sem</SelectItem>
                            <SelectItem value="fourth">4th Sem</SelectItem>
                            <SelectItem value="fifth">5th Sem</SelectItem>
                            <SelectItem value="sixth">6th Sem</SelectItem>
                            <SelectItem value="seventh">7th Sem</SelectItem>
                            <SelectItem value="eighth">8th Sem</SelectItem>
                        </SelectContent>
                    </Select>
                    {(role === "admin" || role === "hod") && <AddRoutineDialog />}
                </div>
            </motion.div>

            {/* Animate the RoutineBox container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <RoutineBox sem={semester} />
            </motion.div>
        </section>
    );
};

export default Routines;
