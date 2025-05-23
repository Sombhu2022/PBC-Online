import { Routines } from "../model/routine.model.js";

class RoutineServices {


    async create(body , userId ){

        const routine =  await Routines.create({
            ...body ,
            user : userId 
        })

        if(!routine) 
            throw Error(" Routine create not success ")

        return routine


    }

    async getAll(semId = ''){
        let routines = []
        if(deptId){
            routines = await Routines.find({ department : deptId})
        }else{
            routines = await Routines.find()
        }

        if(!routines) throw Error(" Routines not found ")
        return routines

    }



}


export const routineServices = new RoutineServices()