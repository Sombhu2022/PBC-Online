import { Noticeboard } from "../model/noticeboard.model.js";
import { cloudinaryFileUploader } from "../config/cloudinary.config.js";
import { fileDestroy } from "../utils/fileUpload.js";

class NoticeboardService {
    async createNotice(req) {
        const { _id } = req.user;
        const { buffer, mimetype } = req.file;
        const { title, description } = req.body;

        const uploadData = await cloudinaryFileUploader(
            buffer,
            mimetype,
            "online/noticeboard"
        );
        console.log(
            "🚀 ~ NoticeboardService ~ createNotice ~ uploadData:",
            uploadData
        );

        if (uploadData?.error) {
            console.error(uploadData?.error);
            throw new Error("File not uploaded, Cloudinary error");
        }

        const notice = await Noticeboard.create({
            title,
            description,
            media: {
                url: uploadData?.url,
                public_id: uploadData?.public_id,
            },
            user: _id,
            // department,
        });
        return notice;
    }

    async showNotices(filterData) {
        // const { user, department } = filterData;
        // const filter = {};

        // if (user) filter.user = user;
        // if (department) filter.department = department;

        // const notices = await Noticeboard.find(filter).select(
        //     "title description media createdAt"
        // );

        const notices = await Noticeboard.find()
            .populate("user")
            .sort({ createdAt: -1 });

        return notices;
    }

    async updateNotice(id, data) {
        const notice = await Noticeboard.findByIdAndUpdate(id, data, {
            new: true,
        });
        return notice;
    }

    async deleteNotice(id) {
        const notice = await Noticeboard.findById(id);
        if (!notice) {
            throw new Error("Notice not found");
        }
        // Delete the media from Cloudinary
        const publicId = notice.media.public_id;
        const res = await fileDestroy(publicId);
        if (!res.success) {
            throw new Error("Failed to delete media from Cloudinary");
        }
        await Noticeboard.findByIdAndDelete(id);
        return res;
    }
}

export default new NoticeboardService();
