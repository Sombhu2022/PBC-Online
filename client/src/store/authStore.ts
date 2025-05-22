import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface AuthState {
    user: Record<string, any> | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    message : string | null;
    login: (body: Record<string, any>,) => any;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set , get) => ({
            user: {},
            role: null,
            isAuthenticated: false,
            isLoading : false ,
            message :  null ,

            login: async(body) =>{
           
                
                try {
                    set({
                        isLoading : true ,
                    })
                    const  { data }  = await axiosInstance.post("user/login" , body   )

                    console.log("=======================res" , data);

                    if(data.data.verifyRequest){
                        toast.info("Please verify your account")
                        return data
                    }

                    set({
                        user: data.data,
                        role: data.data.role,
                        isAuthenticated: true,
                        isLoading : false ,
                        message :  data.message ,
                    })

                    return data
                    
                } catch (error) {
                    console.log("=======================error" , error);
                    
                    set({
                        user: null,
                        isAuthenticated: false,
                        role: null,
                        isLoading : false ,
                        message :  error.response.data.message ,
                    })

                    return error

                }

            } ,

            emailVerifyForLogin : async(body) =>{
                try {
                    const  { data }  = await axiosInstance.post("user/email-verify" , body
                    )
                    // console.log("=======================res" , data);
                    
                    return data
                    
                } catch (error) {
                    // console.log("=======================error" , error);
                    
                    return error

                }

            } ,

                

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                    role: null,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);
