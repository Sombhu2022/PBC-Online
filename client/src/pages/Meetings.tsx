import React, { useEffect, useState } from "react";
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
import { useMeetingStore } from "../store/meetingStore";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Meetings = () => {
  console.log(new Date());

  // State for all form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    meetingType: "",
    meetingLink: "",
  });
  const [emailInput, setEmailInput] = useState("");
  const [emailList, setEmailList] = useState([]);
  const { meetings , addMeeting , fetchMeeting } = useMeetingStore()


  useEffect(() => {
    fetchMeeting()
  }, [])

  console.log("-------------" , meetings);
  


  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle date change from DatePickerDemo (assuming it returns a date string)
  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
    
    setFormData((prev) => ({ ...prev, date }));
  };

  // Handle meeting type change
  const handleMeetingTypeChange = (e) => {
    setFormData((prev) => ({ ...prev, meetingType: e.target.value, meetingLink: "" }));
  };

  // Handle adding email
  const handleAddEmail = () => {
    if (emailInput && !emailList.includes(emailInput)) {
      setEmailList([...emailList, emailInput]);
      setEmailInput("");
    }
  };

  // Handle removing email
  const handleRemoveEmail = (email) => {
    setEmailList(emailList.filter((e) => e !== email));
  };

  // Handle form submission
  const submitMeetingData =async (e) => {
    e.preventDefault();
    const meetingData = {
      subject : formData.title ,
      description : formData.description ,
      meetingDate : formData.date ,
      meetingTime : formData.time ,
      meetingType : formData.meetingType ,
      meetingArea : formData.location ,
      meetingLink : formData.meetingLink ,
      joinusList: emailList,
    };
    console.log("Submitted Meeting Data:", meetingData);
    // Add logic to send data to an API or update state
    // Reset form after submission
    await addMeeting(meetingData)

    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      meetingType: "",
      meetingLink: "",
    });
    setEmailList([]);
  };

  return (
    <>
      <div className="h-[2.7rem] pr-8 flex justify-end items-end">
        <Dialog>
          <DialogTrigger>
            <Button
              variant="outline"
              className="flex flex-row items-center justify-center"
            >
              <CalendarPlus className="text-[5px] p-[2px]" />
              <span>Organize meeting</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-auto h-[95%]">
            <DialogHeader>
              <DialogTitle>Organize new meeting</DialogTitle>
              <DialogDescription className="gap-4 flex flex-col">
                <form
                  onSubmit={submitMeetingData}
                  className="space-y-6 p-6 bg-white max-w-xl mx-auto"
                >
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter meeting title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Meeting purpose, agenda..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1.5 w-full">
                      <Label htmlFor="date">Date</Label>
                      <DatePickerDemo
                        selectedDate={formData.date}
                        onDateChange={handleDateChange}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 w-full">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        className="w-full"
                        value={formData.time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="meetingType">Meeting Type</Label>
                    <select
                      id="meetingType"
                      className="border border-gray-300 rounded-md px-3 py-2"
                      value={formData.meetingType}
                      onChange={handleMeetingTypeChange}
                    >
                      <option value="">Select meeting type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>

                  {/* Conditional Rendering for Meeting Link or Location */}
                  {formData.meetingType === "online" ? (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="meetingLink">Meeting Link</Label>
                      <Input
                        id="meetingLink"
                        placeholder="Paste the meeting link"
                        value={formData.meetingLink}
                        onChange={handleInputChange}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter room/building"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {/* Email list input */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Invite Users by Email</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter email"
                        id="email"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddEmail}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {emailList.map((email, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
                        >
                          <span className="text-sm">{email}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEmail(email)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit">Submit</Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        {meetings?.map((meeting, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MeetingContent
              key={meeting._id}
              title={meeting.subject}
              description={meeting.description}
              date={meeting.meetingDate}
              time={meeting.meetingTime}
              meetingType={meeting.meetingType}
              meetingLink={meeting.meetingLink}
              participants={meeting.joinusList?.length}
              location={meeting.meetingArea}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Meetings;