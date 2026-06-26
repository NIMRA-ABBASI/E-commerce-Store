import {v2  as cloudinary} from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dixo3pvir",
  api_key: 378981647974239,
  api_secret: "SFeXABX5avko2J7hQcQWFjXzbRQ",
});

const storage = new multer.memoryStorage();

const handleImageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

const upload = multer({storage})

export {upload,handleImageUploadUtils}