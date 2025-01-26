import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFileCloudinary = async (fileUrl) => {
    try {
        // Extract the public ID from the file URL
        const urlParts = fileUrl.split('/');
        const publicIdWithExtension = urlParts.slice(-1).join('/'); // Last two parts of the URL
        const publicId = publicIdWithExtension.split('.')[0]; // Remove file extension

        // Call the Cloudinary destroy API
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        console.log(result)
        // Check the result of the deletion
        if (result.result === 'ok') {
            return result;
        } 
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error.message);
        throw error;
    }
};


export { uploadOnCloudinary, deleteFileCloudinary };