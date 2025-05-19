import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
import { fileDestroy, fileUploader } from "../utils/fileUpload.js";
import { timeExpire } from "../utils/timeExpire.js";
import { Users } from "../model/user.model.js";

import mongoose from "mongoose";
import { sendCookie } from "../utils/tokenGenarate.js";

export const UserService = {


    async createUser(userData, body, res) {
        console.log("ok created account ");
        if (
            userData.role === "hod" &&
            (body.role === "hod" || body.role === "admin")
        ) {
            throw new Error("Access denied !");
        }

        // step1 : email exist or not
        const { email } = body;
        const isExist = await Users.findOne({ email });
        if (isExist) {
            throw new Error("User alrady exist ");
        }

        const user = await Users.create(body);

        // const otp = genarate6DigitOtp();
        // user.otp = otp;
        // user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // await user.save();

        await sendEmail(
            user.email,
            `Welcome ${user.name} 🎉`,
            `Thank you for joining <strong>PBC-Online</strong> – your trusted digital companion for academic growth and collaboration. <br><br>We're thrilled to have you on board! Whether you're a teacher, student, faculty member, or external learner, PBC-Online is here to support your journey with the right tools, resources, and community. <br><br>Start exploring and make the most of everything we offer. Let's grow together! 💡📚`
        );

        // await sendEmail(user.email, "Verify Account - OTP", otp);
        // sendCookie(user, res, "user create successfully", 200);
        return user;
    },

    async createStudent( body, res) {
       
        // step1 : email exist or not
        const { email } = body;
        const isExist = await Users.findOne({ email });
        if (isExist) {
            throw new Error("User alrady exist ");
        }

        const user = await Users.create(body);

        const otp = genarate6DigitOtp();
        user.role = "student";
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        await user.save();

        await sendEmail(
            user.email,
            `Welcome ${user.name} 🎉`,
            `Thank you for joining <strong>PBC-Online</strong> – your trusted digital companion for academic growth and collaboration. <br><br>We're thrilled to have you on board! Whether you're a teacher, student, faculty member, or external learner, PBC-Online is here to support your journey with the right tools, resources, and community. <br><br>Start exploring and make the most of everything we offer. Let's grow together! 💡📚`
        );

        await sendEmail(user.email, "Verify Account - OTP", otp);
        
        return user;
    },

   
    async verifyOptWithCookieSet(body, res) {
        const user = await Users.findOne({
            otp : body.otp,
            otpExpiary: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Invalid OTP");
        }

        user.otp = null;
        user.otpExpiary = null;
        user.isVerify = true;
        await user.save();
        sendCookie(user, res, "user create successfully", 200);
    },

    async verifyOtp(otp) {
        const user = await Users.findOne({
            otp,
            otpExpiary: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Invalid OTP");
        }

        user.otp = null;
        user.otpExpiary = null;
        user.isVerify = true;
        await user.save();
        // sendCookie(user, res, "user create successfully", 200);
        return user;
    },

    async sendOtpForVerification(email) {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        await sendEmail(email, "Verify Account - OTP", otp);
    },

    async loginUser(body, res) {
        console.log(body , "------------------------------------log in user" , );
         
        const { email, role, password } = body;
        const user = await Users.findOne({ email: email, role: role }).select(
            "+password"
        );
        // console.log(user);
        
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Invalid email or password");
        }

        if(user.isVerify === false) {
            await this.sendOtpForVerification(email);
            return { verifyRequest: true };
        }

       return sendCookie(user, res, "user login successfully", 200);
    },

    async getUserById(id) {
        
         const user = await Users.findById(id)

         if(!user) {
            throw new Error("User not found")
            }
        if(user.isProfileComplete){
            if(user.role === "hod"){
                const data = await Hods.findOne(user).populate('user', '_id name email').populate('department', 'name')
                if(!data) {
                    throw new Error("hod not found")
                }
                return data
            } else if(user.role === "faculty"){
                const data = await Faculty.findOne(user).populate('user', '_id name email').populate('department', 'name').populate('semester', 'name')
                if(!data) {
                    throw new Error("faculty not found")
                }
                return data
            } else if(user.role === "student"){
                const data = await Students.findOne(user).populate('user', '_id name email').populate('department', 'name').populate('semester', 'name')
                if(!data) {
                    throw new Error("student not found")
                }
                return data
            } else if(user.role === "external"){
                const data = await Externals.findOne(user).populate('user', '_id name email').populate('department', 'name').populate('semester', 'name')
                if(!data) {
                    throw new Error("external not found")
                }
                return data
            }
        
        }

        console.log("user ========> ", user);

        return user;
    },

    async getAllUser(userId) {
        return await Users.find({ _id: { $ne: userId } });
    },


    async changePasswordWithOldPassword(userData, body) {
        const { oldPassword, newPassword } = body;
        const userId = userData._id; // Assuming user is an object with _id property
        if (oldPassword === newPassword) {
            throw new Error("New password must be different from old password");
        }

        const user = await Users.findById(userId).select("+password");
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        user.password = newPassword;
        await user.save();
        return user;
    },

    async forgotPassword(body) {
        const { otp , password } = body;
        const user = await this.verifyOtp(otp);
        user.password = password;
        user.save();
        return user;
    },

    async changeProfilePic(id, file) {
        const user = await Users.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.profile_pic?.public_id) {
            await fileDestroy(user.profile_pic.public_id);
        }

        const { url, public_id, error } = await fileUploader(file);
        if (error) {
            throw new Error("File upload failed");
        }

        user.profile_pic = { url, public_id };
        await user.save();
        return user;
    },

    

    async deleteUser(id) {
        return await Users.findByIdAndDelete(id);
    },

    async updateUser(id, updateData) {
        return await Users.findByIdAndUpdate(id, updateData, { new: true });
    },
};
