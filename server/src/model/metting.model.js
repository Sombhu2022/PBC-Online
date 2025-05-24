import { model, Schema } from "mongoose"
const meetingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    subject: {
        type: String,
        required: [true, 'title is required !'],
        maxLength: [100, 'title should be in 100 letter'],
        minLength: [3, 'title must be in 3 letter '],
        trim: true,
    },
    description: {
        type: String,
        // required: [true, 'description is required !'],
        maxLength: [1000, 'description should be in 1000 letter'],
        minLength: [3, 'description must be in 3 letter '],
        trim: true,
    },
    meetingDate: {
        type: Date,
        required: [true, 'meeting time is required !'],
    },
    meetingTime: {
        type: String,
        required: [true, 'meeting time is required !'],
    },
    meetingType : {
        type: String,
        enum : ['online','offline'],
        default : 'offline' ,
        required: [true, 'meeting type is required !'],
    },
    meetingLink:{
        type: String,
       
        trim: true,
    } ,
    joinusList: [{
        type: String,
        required: [true, 'joinusList is required !'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email address'
        ],
    }],
    meetingArea: {
        type: String,

        trim: true,
    }

}, { timestamps: true })
export const Meetings = model('meeting', meetingSchema)