import mongoose from 'mongoose'

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connection sucessfully ");
    } catch (error) {
        console.log("database have some error ",error);
        process.exit(1);
    }
}

export default dbConnection;