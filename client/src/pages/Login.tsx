import React, { useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <div>
                <Tabs defaultValue="login" className="w-[700px]">
                    <TabsList className="w-full">
                        <TabsTrigger value="login" className="w-full">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="register" className="w-full">
                            Register
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="login"
                        className="flex flex-col items-center w-full"
                    >
                        <div className="w-[60%]">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                            <Label htmlFor="password">Password</Label>
                            <div className="border flex flex-row items-center justify-center rounded-md">
                                <Input
                                    id="password"
                                    type={isVisible ? "text" : "password"}
                                    placeholder="***********"
                                    className="border-0 outline-none"
                                />
                                <Button
                                    variant={"ghost"}
                                    onClick={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? <Eye /> : <EyeClosed />}
                                </Button>
                            </div>
                            <Label>Select Role</Label>

                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="HOD" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hod">H.O.D</SelectItem>
                                    <SelectItem value="faculty">
                                        Faculty
                                    </SelectItem>
                                    <SelectItem value="student">
                                        Student
                                    </SelectItem>
                                    <SelectItem value="external">
                                        External
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                className="w-full bg-green-900"
                                variant={"outline"}
                            >
                                Login
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="register">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default Login;
