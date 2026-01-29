import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APU_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
})


export default cloudinary