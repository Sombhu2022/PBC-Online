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
import { Building2, Eye, EyeClosed, GraduationCap, UserCog, UserPlus, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

// const Login = () => {
//     const [isVisible, setIsVisible] = useState(false);
//     const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
//     const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
//         useState(false);
//     const [passwordStrong, setPasswordStrong] = useState(true);
//     const departments = [
//         'Computer Science',
//         'Math',
//         'Phycise',
//         'Chemistry',
//         'History'
//     ];
    

//     const [loginForm, setLoginForm] = useState({
//         email: "",
//         password: "",
//     });

//     const [registerForm, setRegisterForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         role: "",
//         department: "",
//         newPassword: "",
//         confirmPassword: "",
//     });

//     const login = (e) => {
//         e.preventDefault();
//         console.log(loginForm);
//     };

//     const register = (e) => {
//         e.preventDefault();
//         console.log(registerForm);
//     };

//     const loginFormChanges = (e) => {
//         const { id, value } = e.target;
//         setLoginForm((prev) => ({ ...prev, [id]: value }));
//     };

//     const registerFormChanges = (e) => {
//         const { id, value } = e.target;
//         setRegisterForm((prev) => ({ ...prev, [id]: value }));
//         if (id === "newPassword") {
//             const passwordRegex =
//                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//             setPasswordStrong(passwordRegex.test(value));
//         }
//     };

//     return (
//         <section className="flex flex-col items-center justify-center h-screen">
//             <div className="border border-gray-300 rounded-lg fixed top-35">
//                 <Tabs defaultValue="login" className="w-[500px]">
//                     <TabsList className="w-full">
//                         <TabsTrigger value="login" className="w-full">
//                             Login
//                         </TabsTrigger>
//                         <TabsTrigger value="register" className="w-full">
//                             Register
//                         </TabsTrigger>
//                     </TabsList>

//                     {/* Login Form */}
//                     <form onSubmit={login}>
//                         <TabsContent
//                             value="login"
//                             className="flex flex-col items-center w-full"
//                         >
//                             <div className="w-[70%] flex flex-col gap-y-4 pb-5">
//                                 <div className="flex flex-col gap-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         value={loginForm.email}
//                                         onChange={loginFormChanges}
//                                         placeholder="Enter email"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col gap-y-2">
//                                     <Label htmlFor="password">Password</Label>
//                                     <div className="border flex items-center rounded-l-md">
//                                         <Input
//                                             id="password"
//                                             type={
//                                                 isVisible ? "text" : "password"
//                                             }
//                                             placeholder="***********"
//                                             className="border-0 outline-none"
//                                             value={loginForm.password}
//                                             onChange={loginFormChanges}
//                                         />
//                                         <Button
//                                             className="bg-transparent"
//                                             variant="ghost"
//                                             onClick={() =>
//                                                 setIsVisible(!isVisible)
//                                             }
//                                         >
//                                             {isVisible ? <Eye /> : <EyeClosed />}
//                                         </Button>
//                                     </div>
//                                 </div>
//                                 <Button
//                                     className="w-full bg-[#1163b6] hover:bg-[#1164b6a1]"
//                                     variant="outline"
//                                 >
//                                     Login
//                                 </Button>
//                             </div>
//                         </TabsContent>
//                     </form>

//                     {/* Register Form */}
//                     <form
//                         className="flex flex-col items-center justify-center"
//                         onSubmit={register}
//                     >
//                         <TabsContent
//                             value="register"
//                             className="flex flex-col w-[80%] gap-y-4"
//                         >
//                             <div>
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input
//                                     id="name"
//                                     value={registerForm.name}
//                                     onChange={registerFormChanges}
//                                     placeholder="Enter Name"
//                                 />
//                             </div>
//                             <div className="flex gap-x-4">
//                                 <div>
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         value={registerForm.email}
//                                         onChange={registerFormChanges}
//                                         placeholder="Enter Email"
//                                     />
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="phone">Phone</Label>
//                                     <Input
//                                         id="phone"
//                                         value={registerForm.phone}
//                                         onChange={registerFormChanges}
//                                         placeholder="Enter Phone No."
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex gap-x-4">
//                                 <div className="w-1/2">
//                                     <Label htmlFor="role">Position</Label>
//                                     <Select
//                                         value={registerForm.role}
//                                         onValueChange={(value) =>
//                                             setRegisterForm((prev) => ({
//                                                 ...prev,
//                                                 role: value,
//                                                 department: "", 
//                                             }))
//                                         }
//                                     >
//                                         <SelectTrigger className="w-full">
//                                             <SelectValue placeholder="Position" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="admin">
//                                                 Admin
//                                             </SelectItem>
//                                             <SelectItem value="hod">
//                                                 H.O.D
//                                             </SelectItem>
//                                             <SelectItem value="faculty">
//                                                 Faculty
//                                             </SelectItem>
//                                             <SelectItem value="student">
//                                                 Student
//                                             </SelectItem>
//                                             <SelectItem value="external">
//                                                 External
//                                             </SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                 </div>
//                                 <div className="w-1/2">
//     <Label htmlFor="department">Department</Label>
//     {registerForm.role === "hod" ? (
//         <Input
//             id="department"
//             placeholder="Enter new department"
//             value={registerForm.department}
//             onChange={registerFormChanges}
//         />
//     ) : (
//         <Select
//             value={registerForm.department}
//             onValueChange={(value) =>
//                 setRegisterForm((prev) => ({
//                     ...prev,
//                     department: value,
//                 }))
//             }
//         >
//             <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select Department" />
//             </SelectTrigger>
//             <SelectContent>
//                 {departments.map((dept, index) => (
//                     <SelectItem key={index} value={dept}>
//                         {dept}
//                     </SelectItem>
//                 ))}
//             </SelectContent>
//         </Select>
//     )}
// </div>


//                             </div>

//                             <div>
//                                 <Label htmlFor="newPassword">Password</Label>
//                                 <div className="flex">
//                                     <Input
//                                         id="newPassword"
//                                         type={
//                                             isVisibleNewPassword
//                                                 ? "text"
//                                                 : "password"
//                                         }
//                                         value={registerForm.newPassword}
//                                         onChange={registerFormChanges}
//                                         placeholder="Enter new Password"
//                                     />
//                                     <Button
//                                         className="bg-transparent"
//                                         variant="ghost"
//                                         onClick={() =>
//                                             setIsVisibleNewPassword(
//                                                 !isVisibleNewPassword
//                                             )
//                                         }
//                                     >
//                                         {isVisibleNewPassword ? (
//                                             <Eye />
//                                         ) : (
//                                             <EyeClosed />
//                                         )}
//                                     </Button>
//                                 </div>
//                                 {!passwordStrong && (
//                                     <p className="text-[11px] text-red-500 pt-2 pl-1">
//                                         Password must be at least 8 characters
//                                         long and include uppercase, lowercase,
//                                         number, and special character (
//                                         @$!%*?&).
//                                     </p>
//                                 )}
//                             </div>

//                             <div>
//                                 <Label htmlFor="confirmPassword">
//                                     Confirm Password
//                                 </Label>
//                                 <div className="flex">
//                                     <Input
//                                         id="confirmPassword"
//                                         type={
//                                             isVisibleConfirmPassword
//                                                 ? "text"
//                                                 : "password"
//                                         }
//                                         value={registerForm.confirmPassword}
//                                         onChange={registerFormChanges}
//                                         placeholder="Enter confirm Password"
//                                     />
//                                     <Button
//                                         className="bg-transparent"
//                                         variant="ghost"
//                                         onClick={() =>
//                                             setIsVisibleConfirmPassword(
//                                                 !isVisibleConfirmPassword
//                                             )
//                                         }
//                                     >
//                                         {isVisibleConfirmPassword ? (
//                                             <Eye />
//                                         ) : (
//                                             <EyeClosed />
//                                         )}
//                                     </Button>
//                                 </div>
//                                 {registerForm.newPassword !==
//                                     registerForm.confirmPassword && (
//                                     <p className="text-[11px] text-red-500 pl-1 pt-2">
//                                         Passwords do not match.
//                                     </p>
//                                 )}
//                             </div>

//                             <Button
//                                 className="w-full bg-[#1163b6] hover:bg-[#1164b6a1] mb-4"
//                                 variant="outline"
//                             >
//                                 Register
//                             </Button>
//                         </TabsContent>
//                     </form>
//                 </Tabs>
//             </div>
//         </section>
//     );
// };

// export default Login;


// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Eye, EyeIcon as EyeClosed, UserCog, GraduationCap, Users, Building2, UserPlus } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"

const Login = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("role")
  const [selectedRole, setSelectedRole] = useState("")

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const login = (e) => {
    e.preventDefault()
    console.log({ role: selectedRole, ...loginForm })
  }

  const loginFormChanges = (e) => {
    const { id, value } = e.target
    setLoginForm((prev) => ({ ...prev, [id]: value }))
  }

  const roles = [
    { id: "admin", name: "Admin", icon: <UserCog className="h-10 w-10" /> },
    { id: "hod", name: "H.O.D", icon: <Building2 className="h-10 w-10" /> },
    { id: "student", name: "Student", icon: <GraduationCap className="h-10 w-10" /> },
    { id: "external", name: "External", icon: <UserPlus className="h-10 w-10" /> },
    { id: "faculty", name: "Faculty", icon: <Users className="h-10 w-10" /> },
  ]

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setActiveTab("credentials")
  }

  const handleBackToRoles = () => {
    setActiveTab("role")
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="border border-gray-300 rounded-lg shadow-md fixed top-35">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[500px]">
          <TabsList className="w-full">
            <TabsTrigger value="role" className="w-full">
              Select Role
            </TabsTrigger>
            <TabsTrigger value="credentials" className="w-full" disabled={!selectedRole}>
              Login Credentials
            </TabsTrigger>
          </TabsList>

          {/* Role Selector */}
          <TabsContent value="role" className="flex flex-col items-center w-full p-6">
            <h2 className="text-xl font-semibold mb-6">Select Your Role</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:border-[#1163b6] hover:shadow-md ${
                    selectedRole === role.id ? "border-[#1163b6]" : ""
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-[#1163b6]">{role.icon}</div>
                    <h3 className="mt-3 font-medium">{role.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Login Credentials Form */}
          <form onSubmit={login}>
            <TabsContent value="credentials" className="flex flex-col items-center w-full">
              <div className="w-[70%] flex flex-col gap-y-4 py-5">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 rounded-full bg-blue-100 text-[#1163b6]">
                    {roles.find((r) => r.id === selectedRole)?.icon}
                  </div>
                </div>
                <p className="text-center mb-4">
                  Logging in as <strong>{roles.find((r) => r.id === selectedRole)?.name}</strong>
                </p>
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={loginForm.email} onChange={loginFormChanges} placeholder="Enter email" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="border flex items-center rounded-md">
                    <Input
                      id="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="***********"
                      className="border-0 outline-none"
                      value={loginForm.password}
                      onChange={loginFormChanges}
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
                <div className="flex gap-2 mt-2">
                  <Button type="button" variant="outline" className="w-1/2" onClick={handleBackToRoles}>
                    Back
                  </Button>
                  <Button type="submit" className="w-1/2 bg-[#1163b6] hover:bg-[#1164b6a1]">
                    Login
                  </Button>
                </div>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </section>
  )
}

export default Login
