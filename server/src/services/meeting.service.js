import { Meetings } from "../model/metting.model.js";
import { sendEmail } from "../utils/sendMail.js";


class MeetingService {
    async createMeeting(body, user) {
        const { emailList, ...data } = body;
        const { id, email, name } = user;

        const meeting = await Meetings.create({ ...data, user: id });

        if (!meeting) {
            throw Error("meeting not created !")
        }

        if (meeting.joinusList.length > 0) {

            await sendEmail(
                meeting.joinusList,
                `You're Invited: A Meeting by ${name}`,
                `Hello there,

You’ve been invited to a meeting by ${name}. Here are the details:

📌 **Subject:** ${meeting.subject}  
📝 **Description:** ${meeting.description}  
🕒 **Time:** ${meeting.meetingTime}  
📍 **Location:** ${meeting.meetingArea}  
📅 **Date:** ${meeting.date}

We’d love to have you join us. Looking forward to your presence!

Warm regards,  
${name}
`
            );


        }
        return meeting;
    }

    async showMeeting() {
        
        const meetings = await Meetings.find({}).populate("user", "name email profile_pic _id")
        if(! meetings.length){
            throw Error("meeting not found !")
        }

        return meetings;
    }


    async updateMeeting(id, data) {
        const meeting = await Meetings.findByIdAndUpdate(id, data, {
            new: true,
        });
        return meeting;
    }

    async deleteMeeting(id) {
        const meeting = await Meetings.findByIdAndDelete(id);
        return meeting;
    }
}

export default new MeetingService();
