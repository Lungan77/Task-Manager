import Mongoose from "mongoose";

const ConnectDb = async() => {
    try {

        const conn = await Mongoose.connect(process.env.MONGO_URL);
        console.log(`Database ${conn.connection.host} connected`);

    } catch (error) {
        
        console.log(error);
        process.exit(1);

    }
}

export default ConnectDb;
