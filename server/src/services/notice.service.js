import { Noticeboard } from "../model/noticeboard.model.js";

class NoticeboardService {
    async createNotice(data, file, userId) {
        const { title, description, department } = data

        let pdfData = {};
        if (file.pdf) {
            pdfData = await fileUploader(file.path);
            if (pdfData.error) {
                throw new Error("PDF not uploaded, cloudinary error");
            }
        }

        const notice = await Noticeboard.create({
            title,
            description,
            media: {
                url: pdfData.url || null,
                public_id: pdfData.public_id || null,
            },
            ...(department && { department }),
            user: userId,
        });
        return notice;
    }

    async showNotices(filterData) {
        const { user, department } = filterData;
        const filter = {};

        if (user) filter.user = user;
        if (department) filter.department = department;

        const notices = await Noticeboard.find(filter)
            .select("title description media createdAt");

        return notices || null;
    }

    async updateNotice(id, data) {
        const notice = await Noticeboard.findByIdAndUpdate(id, data, {
            new: true,
        });
        return notice;
    }

    async deleteNotice(id) {
        const notice = await Noticeboard.findByIdAndDelete(id);
        return notice;
    }
}

export default new NoticeboardService();
