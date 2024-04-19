import mongoose from 'mongoose'

let isConnected=false;

export const connectToDB=async ()=>{
    mongoose.set('strictQuery',true);
    console.log("eithi pasuchi");
    if(isConnected){
        console.log('MongoDB connected');
        return;
    }

  

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbname:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected=true;

        console.log('MongoDB connected')
    } catch(error) {

        console.log(error);

    }

}