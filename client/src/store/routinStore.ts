 import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface AuthState {
    routines: any[];
    isLoading: boolean;
    message : string | null;
    addRoutine: (body: Record<string, any>,) => any;
    
}

export const useRoutineStore = create<AuthState>()(
    persist(
        (set , get) => ({
            routines: [],
            isLoading : false ,
            message :  null ,

            addRoutine: async(body) =>{
           
                
                try {
                    set({
                        isLoading : true ,
                    })
                    const  { data }  = await axiosInstance.post("routine" , body   )

                    console.log("=======================res" , data);

                    set({
                        routines : [ ...get().routines , data.data ],
                        isLoading : false ,
                        message :  data.message ,
                    })

                    return data
                    
                } catch (error) {
                    console.log("=======================error" , error);
                    
                    set({
                        isLoading : false ,
                        message :  error.response.data.message ,
                    })

                    return error

                }

            } ,



            fetchRoutines : async()=>{
                try {
                    set({
                        isLoading : true ,
                    })
                    const  { data }  = await axiosInstance.get("routine" )

                    console.log("=======================res" , data);
                    
                    set({
                        routines : data.data ,
                        isLoading : false ,
                        message :  data.message ,
                    })

                    return data
                    
                } catch (error) {
                    console.log("=======================error" , error);
                    set({
                        routines : [] ,
                        isLoading :false , 
                        message :  error.response.data.message ,
                    })

                    return error 
                    }

                },


        }),
        {
            name: "routine-storage",
        }
    )
);
