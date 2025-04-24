import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const HOD = [
    {
        department: "CS",
        name: "Ravi Kumar",
        phone: "9876543210",
        email: "ravikumar123@university.edu",
    },
    {
        department: "Bengali",
        name: "Mitali Ghosh",
        phone: "9123456780",
        email: "mitalighosh456@university.edu",
    },
    {
        department: "History",
        name: "Suman Dey",
        phone: "9988776655",
        email: "sumandey789@university.edu",
    },
    {
        department: "Physic",
        name: "Arun Sharma",
        phone: "9090909090",
        email: "arunsharma321@university.edu",
    },
    {
        department: "Math",
        name: "Neha Roy",
        phone: "9871234560",
        email: "neharoy654@university.edu",
    },
];


const MemberHOD = () => {
    const [search, setSearch] = useState("");

    const filteredHOD = HOD.filter((hod) =>
        hod.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full h-fit mr-2 border-gray-300 border-[1px] rounded-lg p-4">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-background"
                />
            </div>

            <Table>
                <TableCaption>List of all HODs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4 text-center">Department</TableHead>
                        <TableHead className="w-1/4 text-center">Name</TableHead>
                        <TableHead className="w-1/4 text-center">Phone No</TableHead>
                        <TableHead className="w-1/4 text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredHOD.length > 0 ? (
                        filteredHOD.map((hod, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{hod.department}</TableCell>
                                <TableCell className="text-center">{hod.name}</TableCell>
                                <TableCell className="text-center">{hod.phone}</TableCell>
                                <TableCell className="text-center">{hod.email}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center text-gray-400 italic"
                            >
                                No matching results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MemberHOD;
