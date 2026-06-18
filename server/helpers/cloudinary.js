import cloudinary from 'cloudinary.v2'
import multer from 'multer'


cloudinary.config({
    cloud_name :  'dixo3pvir',
    api_key:378981647974239,
    api_secret : 'SFeXABX5avko2J7hQcQWFjXzbRQ'
})

const storage = new multer.memoryStorage();

const handleImageUpload = async()=>
{
    
}