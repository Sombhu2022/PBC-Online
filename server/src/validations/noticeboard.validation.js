import { z } from "zod";

class NoticeboardValidation {

    // Create Notice
    create = z.object({
        body: z.object({
            // user: z.string({ required_error: "User ID is required" }),

            department: z.string({ required_error: "Department ID is required" }).optional(),

            title: z
                .string({ required_error: "Title is required" })
                .min(3, "Title must be at least 3 characters")
                .max(60, "Title should be within 60 characters")
                .trim(),

            description: z
                .string({ required_error: "Description is required" })
                .min(3, "Description must be at least 3 characters")
                .max(500, "Description should be within 500 characters")
                .trim(),

            file: z.object({
                fieldname: z.string(),
                originalname: z.string(),
                encoding: z.string(),
                mimetype: z.string(),
                destination: z.string(),
                filename: z.string(),
                path: z.string(),
                size: z.number().min(1, "File size must be greater than 0"),
            }),
        }),
    });

    // Update Notice
    update = z.object({
        params: z.object({
            noticeId: z.string({ required_error: "Notice ID is required" }),
        }),
        body: z.object({
            title: z
                .string()
                .min(3, "Title must be at least 3 characters")
                .max(60, "Title should be within 60 characters")
                .trim()
                .optional(),

            description: z
                .string()
                .min(3, "Description must be at least 3 characters")
                .max(500, "Description should be within 500 characters")
                .trim()
                .optional(),

            media: z
                .object({
                    url: z.string().url("Invalid URL"),
                    public_id: z.string(),
                })
                .optional(),
        }),
    });

    // Delete Notice
    delete = z.object({
        params: z.object({
            noticeId: z.string({ required_error: "Notice ID is required" }),
        }),
    });
}

export default new NoticeboardValidation();
