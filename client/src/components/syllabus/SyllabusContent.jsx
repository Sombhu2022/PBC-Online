import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PenIcon, Trash2, ScanEyeIcon, ArrowDownToLine } from "lucide-react";
import { Input } from "../ui/input";
const SyllabusContent = ({ syllabus = [] }) => {
  console.log("syllabus=>", syllabus);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = syllabus.filter(
    (item) =>
      item.paperCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paperName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="mb-4 w-full">
        <Input
          type="text"
          placeholder="Search by paper code or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <Table>
        <TableCaption>List of all syllabus papers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left pl-6">Semester</TableHead>
            <TableHead className="text-center">Paper Code</TableHead>
            <TableHead className="text-center">Paper Name</TableHead>
            <TableHead
            // className={
            //     role === "admin" || role === "hod"
            //         ? "text-right pr-[120px]"
            //         : "text-right pr-[60px]"
            // }
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((syllabus) => (
              <TableRow key={syllabus._id}>
                <TableCell className="text-left pl-10">
                  {syllabus.semester?.name || syllabus.semester}
                </TableCell>
                <TableCell className="text-center">
                  {syllabus.paperCode}
                </TableCell>
                <TableCell className="text-center">
                  {syllabus.paperName}
                </TableCell>
                <TableCell className="text-left">
                  <div className="w-full flex justify-end pr-5 gap-1">
                    <Sheet>
                      <SheetTrigger>
                        <ScanEyeIcon />
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle className="h-20 w-full flex flex-col justify-center items-center">
                            <span className="font-normal">
                              {syllabus.semester?.name || syllabus.semester}
                            </span>
                            <span className="font-normal">
                              {syllabus.paperCode}
                            </span>
                            <span className="font-normal">
                              {syllabus.paperName}
                            </span>
                          </SheetTitle>
                          <SheetDescription>
                            {syllabus.media && syllabus.media.length > 0 ? (
                              syllabus.media[0].mediaUrl.match(
                                /\.(jpeg|jpg|png|gif)$/i
                              ) ? (
                                <img
                                  src={syllabus.media[0].mediaUrl}
                                  alt="Syllabus Media"
                                  className="mt-2 max-w-full h-auto"
                                />
                              ) : (
                                <a
                                  href={syllabus.media[0].mediaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View PDF
                                </a>
                              )
                            ) : (
                              "No media available"
                            )}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>

                    <Button
                      variant={"ghost"}
                      onClick={() => handleDownload(syllabus.media)}
                    >
                      <ArrowDownToLine />
                    </Button>
                    {/* {(role === "admin" || role === "hod") && ( */}
                    <>
                      <Button
                        variant={"ghost"}
                        // onClick={() => handleDelete(syllabus._id)}
                      >
                        <PenIcon />
                      </Button>
                      <Button
                        variant={"ghost"}
                        // onClick={() => handleDelete(syllabus._id)}
                      >
                        <Trash2 />
                      </Button>
                    </>
                    {/* )} */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-400 italic"
              >
                No matching syllabus found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SyllabusContent;
