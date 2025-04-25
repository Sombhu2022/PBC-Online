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
import { Eye, EyeClosed, Loader2, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/authStore";

const AddMemberDialog = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [dept, setDept] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const { token } = useAuthStore();

    const handleAddMember = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "/user/create",
                {
                    email,
                    name,
                    role,
                    password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);

            // Clear form
            setName("");
            setEmail("");
            setMobile("");
            setRole("");
            setPassword("");
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
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
                    <Input
                        type="number"
                        placeholder="Mobile no"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
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
                    {/* Dept select  */}
                    <Select
                        value={dept}
                        onValueChange={(value) => setDept(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Depertment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hod">
                                Computer Science
                            </SelectItem>
                            <SelectItem value="faculty">BCA</SelectItem>
                            <SelectItem value="external">Geography</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                    </Select>

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

                    <Button
                        onClick={handleAddMember}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Save Member"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
