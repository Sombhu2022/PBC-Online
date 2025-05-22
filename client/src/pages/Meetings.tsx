// import React, { useEffect } from "react";
// import MeetingContent from "../components/meeting/MeetingContent";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "../components/ui/dialog";
// import { motion } from "framer-motion";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Label } from "../components/ui/label";
// import { Textarea } from "../components/ui/textarea";

// import { CalendarPlus } from "lucide-react";
// import { DatePickerDemo } from "../components/layout/DatePicker";
// import { useAuthStore } from "../store/authStore";
// const meetingDetails = [
//     {
//         title: "Research Review",
//         description: "Discussing project milestones and issues",
//         date: "20-08-2025",
//         time: "10:00",
//         participants: 10,
//         location: "VS201",
//     },
//     {
//         title: "Research Review",
//         description: "Discussing project milestones and issues",
//         date: "20-02-2025",
//         time: "10:00",
//         participants: 10,
//         location: "VS201",
//     },
//     {
//         title: "Research Review",
//         description: "Discussing project milestones and issues",
//         date: "15-04-2025",
//         time: "10:00",
//         participants: 10,
//         location: "VS201",
//     },
// ];
// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
// };

// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.1,
//         },
//     },
// };
// const Meetings = () => {

//     const role : string | null = useAuthStore((state) => state.role); 
//     // const role : string | null = 'student'; 

//     console.log(new Date());
//     const submitMeetingData = () => {};

//     return (
//         <>
           
//             <div className=" h-[2.7rem] pr-8 flex justify-end items-end">
//                 {(role === 'admin' || role === 'hod') &&(
//                     <Dialog>
//                     <DialogTrigger>
//                         <Button
//                             variant="outline"
//                             className="flex flex-row items-center justify-center"
//                         >
//                             <CalendarPlus className="text-[5px] p-[2px]" />
//                             <span>Organize meeting</span>
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Organize new meeting</DialogTitle>
//                             <DialogDescription className="gap-4 flex flex-col">
//                                 <form
//                                     onSubmit={submitMeetingData}
//                                     className="space-y-6 p-6 bg-white max-w-xl mx-auto"
//                                 >
//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="title">Title</Label>
//                                         <Input
//                                             id="title"
//                                             placeholder="Enter meeting title"
//                                             // value={meetinfData}
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="description">
//                                             Description
//                                         </Label>
//                                         <Textarea
//                                             id="description"
//                                             placeholder="Meeting purpose, agenda..."
//                                         />
//                                     </div>

//                                     <div className="flex flex-col sm:flex-row gap-4">
//                                         <div className="flex flex-col gap-1.5 w-full  ">
//                                             <Label htmlFor="date">Date</Label>
//                                             <DatePickerDemo />
//                                         </div>

//                                         <div className="flex flex-col gap-1.5 w-full  ">
//                                             <Label htmlFor="time">Time</Label>
//                                             <Input
//                                                 id="time"
//                                                 type="time"
//                                                 className="w-full "
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="location">
//                                             Location
//                                         </Label>
//                                         <Input
//                                             id="location"
//                                             placeholder="Enter room/building"
//                                         />
//                                     </div>

//                                     <div className="flex flex-col gap-1.5">
//                                         <Label htmlFor="email">
//                                             User email
//                                         </Label>
//                                         <Input
//                                             placeholder="Email"
//                                             id="email"
//                                             type="email"
//                                         />
//                                     </div>
//                                 </form>

//                                 <Button>Submit</Button>
//                             </DialogDescription>
//                         </DialogHeader>
//                     </DialogContent>
//                     </Dialog>
//                 )}
//             </div>
//             <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="show"
//             >
//                 {meetingDetails.map((meeting, index) => (
//                     <motion.div key={index} variants={itemVariants}>
//                         <MeetingContent
//                             key={index}
//                             title={meeting.title}
//                             description={meeting.description}
//                             date={meeting.date}
//                             time={meeting.time}
//                             participants={meeting.participants}
//                             location={meeting.location}
//                         />
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </>
//     );
// };

// export default Meetings;

import React from "react";
import MeetingContent from "../components/meeting/MeetingContent";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { CalendarPlus } from "lucide-react";
import { DatePickerDemo } from "../components/layout/DatePicker";
import { useAuthStore } from "../store/authStore";

const meetingDetails = [
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "20-08-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "20-02-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
    {
        title: "Research Review",
        description: "Discussing project milestones and issues",
        date: "15-04-2025",
        time: "10:00",
        participants: 10,
        location: "VS201",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Meetings = () => {
    const role: string | null = useAuthStore((state) => state.role);
    // const role: string | null = 'student';


    return (
        <div className="container flex flex-col gap-4">
            <motion.div
                className="flex flex-row items-center justify-between pb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-2xl font-semibold">Meetings</h1>
                    <p>Manage and view department meetings</p>
                </div>
                {(role === "admin" || role === "hod") && (
                    <Dialog>
                        <DialogTrigger >
                            <Button
                                variant="default"
                                className="flex flex-row items-center justify-center gap-2"
                            >
                                <CalendarPlus className="w-4 h-4" />
                                <span>Organize meeting</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Organize new meeting</DialogTitle>
                                <DialogDescription className="gap-4 flex flex-col">
                                    <form className="space-y-6 p-6 bg-white max-w-xl mx-auto">
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="title">Title</Label>
                                            <Input id="title" placeholder="Enter meeting title" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea id="description" placeholder="Meeting purpose, agenda..." />
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex flex-col gap-1.5 w-full">
                                                <Label htmlFor="date">Date</Label>
                                                <DatePickerDemo />
                                            </div>
                                            <div className="flex flex-col gap-1.5 w-full">
                                                <Label htmlFor="time">Time</Label>
                                                <Input id="time" type="time" className="w-full" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="location">Location</Label>
                                            <Input id="location" placeholder="Enter room/building" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label htmlFor="email">User email</Label>
                                            <Input id="email" type="email" placeholder="Email" />
                                        </div>
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </motion.div>

            <motion.div
                className="flex flex-col gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {meetingDetails.map((meeting, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <MeetingContent
                            title={meeting.title}
                            description={meeting.description}
                            date={meeting.date}
                            time={meeting.time}
                            participants={meeting.participants}
                            location={meeting.location}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Meetings;
