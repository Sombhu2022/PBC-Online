import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../api/axiosInstance";
import { toast } from "sonner";

interface MeetingStore {
    meetings: any[];
    isLoading: boolean;
    message : string | null;
    addMeeting: (body: Record<string, any>,) => any;
    fetchMeeting: () => void;
}

export const useMeetingStore = create<MeetingStore>()(
    persist(
        (set , get) => ({
            meetings: [],
            role: null,
            members : [] ,
            isAuthenticated: false,
            isLoading : false ,
            message :  null ,

            addMeeting: async(body) =>{
           
                
                try {
                    set({
                        isLoading : true ,
                    })
                    const  { data }  = await axiosInstance.post("meeting" , body   )

                    console.log("=======================res" , data);

                    set((state)=>({
                        meetings: [...state.meetings , data.data],
                        isLoading : false ,
                        message :  data.message ,
                    }))

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

            fetchMeeting : async() =>{
                try {
                    const  { data }  = await axiosInstance.get("meeting"
                    )
                    // console.log("=======================res" , data);

                      set({
                        meetings: data.data,
                        isLoading : false ,
                        message :  data.message ,
                    })
                    
                    return data
                    
                } catch (error) {
                    // console.log("=======================error" , error);
                    
                    set({
                      meetings: [] ,
                      isLoading : false ,
                      message :  error.message ,
                  })
                    return error

                }

            } ,

 


        }),
        {
            name: "auth-storage",
        }
    )
);
