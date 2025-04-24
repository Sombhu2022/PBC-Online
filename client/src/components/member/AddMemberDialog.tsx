import React, { useState } from "react";
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
import { Eye, EyeClosed, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const AddMemberDialog = () => {
      const [isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const handleAddMember = () => {
        console.log("Member Added:", {
            name,
            email,
            role,
            password,
        });

        // Clear form
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                    <DialogDescription>
                        Fill in the member details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                   <div className="flex flex-col gap-y-2">
                        <div className="border flex items-center rounded-md">
                            <Input
                            id="password"
                            type={isVisible ? "text" : "password"}
                            placeholder="Password"
                            className="border-0 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                            type="button"
                            className="bg-transparent"
                            variant="ghost"
                            onClick={() => setIsVisible(!isVisible)}
                            >
                            {isVisible ? <Eye /> : <EyeClosed />}
                            </Button>
                        </div>
                    </div>
                    {/* Role selection */}
                    <Select
                        value={role}
                        onValueChange={(value) => setRole(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hod">HOD</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="external">External</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={handleAddMember} className="w-full">
                        Save Member
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
