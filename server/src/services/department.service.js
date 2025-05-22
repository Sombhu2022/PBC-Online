import { Departments } from "../model/department.model.js";

class DepartmentService {
    async createDepartment(data , user ) {
        const { id } = user 
        const department = await Departments.create({ ...data , user : id});
        const departmentData = await Departments.findById(department._id).populate('user' , "name email _id profile_pic");
        return departmentData;
    }

    async updateDepartment(id, data) {
        const department = await Departments.findByIdAndUpdate(id, data, {
            new: true,
        }).populate('user' , "name email _id profile_pic");
        return department;
    }

    async showDepartment(id) {
        if (!id) {
            return await Departments.find({}).populate('user' , "name email _id profile_pic");
        }
        return await Departments.findById(id).populate('user' , "name email _id profile_pic");
    }

    async deleteDepartment(id) {
        const department = await Departments.findByIdAndDelete(id);
        return department;
    }
}

export default new DepartmentService();
