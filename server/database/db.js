import mongoose from 'mongoose'

const connectToDb = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Succesfully connected to database")

}catch(e){
    console.log("Connection fail ",e)
    process.exit(0);
}
}

export default connectToDb