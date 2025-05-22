import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import NoticeContent from "../components/notices/NoticeContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useAuthStore } from "../store/authStore";
import { useNoticeStore } from "../store/noticeStore";
import { toast } from "sonner";

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

const NoticeBoard = () => {
  const user = useAuthStore((state) => state.user);
  const departmentID = user?.departmentid;
  const userID = user?.id || user?._id;
  const { notices, fetchNotices, createNotice, isLoading } = useNoticeStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (departmentID) fetchNotices(departmentID);
  }, [departmentID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }
    // console.log("Submitting with file:", file);
    // if (!userID || !departmentID) {
    //   toast.error("User authentication required.");
    //   return;
    // }

    try {
      if (file) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("document", file);

        await createNotice(formData);
      }

      setTitle("");
      setDescription("");
      setFile(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating notice:", error);
    }
  };

  return (
    <div className="p-6 flex-col flex gap-4">
      <motion.div
        className="flex flex-row items-center justify-between pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Notice Board</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row items-center justify-center gap-2"
            >
              <Plus />
              <span>Create Notice</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new notice</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new notice.
              </DialogDescription>
            </DialogHeader>
            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Notice title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notice title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Notice description</Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter notice description"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="doc">Upload document (optional)</Label>
                  <Input
                    id="doc"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setFile(selectedFile);
                      if (selectedFile) {
                        console.log("Selected file:", {
                          name: selectedFile.name,
                          size: selectedFile.size,
                          type: selectedFile.type,
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <Button
                variant="default"
                className="w-full bg-slate-900 hover:bg-slate-800"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Notice"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {notices.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-8 text-gray-500"
          >
            <p>No notices found</p>
          </motion.div>
        ) : (
          notices.map((notice) => (
            <motion.div variants={itemVariants} key={notice._id}>
              <NoticeContent notice={notice} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default NoticeBoard;
