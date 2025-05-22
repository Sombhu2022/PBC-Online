import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_DB,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });
};

export const cloudinaryFileUploader = (
    buffer,
    mimetype,
    folder = "uploads"
) => {
    const resource_type = mimetype.startsWith("image")
        ? "image"
        : mimetype.startsWith("video") || mimetype.startsWith("audio")
        ? "video"
        : "raw";

    console.log("🚀 ~ resource_type:", resource_type);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type },
            (error, result) => {
                if (error) {
                    return reject({ url: null, public_id: null, error });
                }
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    error: null,
                });
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
