import { Externals } from "../model/external.model.js";
import { Users } from "../model/user.model.js";


class ExternalService {

    async create(userData , body) {
        const { user , department , semester , paperName , paperCode , doe} = body
        const { id } = userData
        const userExist = await Users.findById(user)
        if(!userExist) {
            throw new Error('user not found')
        }
        const isExist = await Externals.findOne({ user : user })
        if(isExist) {
            throw new Error('External already exist')
        }
        const data = await Externals.create({
            user : user,
            creator : id,
            department : department,
            semester : semester,
            paperName : paperName,
            paperCode : paperCode,
            doe : doe 
        });
        userExist.isProfileComplete = true
        await userExist.save()
        data = await Externals.findById(data._id).populate('user', 'name email').populate('creator', 'name email').populate('department', 'name').populate('semester', 'name');
        if (!data) {
            throw new Error('External not found')
        }
        return data;
    }
    
    async update(id, body) {
        const data = await Externals.findByIdAndUpdate(id, body, {
            new: true,
        }).populate('user', 'name email').populate('creator', 'name email').populate('department', 'name').populate('semester', 'name');
        if (!data) {
            throw new Error('External not found')
        }
        return data;
    }

    async delete(id) {
        const data = await Externals.findByIdAndDelete(id);
        return data;
    }

    async getAll() {
        const data = await Externals.find().populate('user', 'name email').populate('creator', 'name email').populate('department', 'name').populate('semester', 'name');
        return data ? data : [];
    }

    async getById(id) {
        const data = await Externals.findById(id).populate('user', 'name email').populate('creator', 'name email').populate('department', 'name').populate('semester', 'name');
        if (!data) {
            throw new Error('External not found')
        }
        return data;
    }

}

export default new ExternalService();
