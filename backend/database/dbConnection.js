import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "Job_Portal",
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(`Failed to connect ${error}`);
    });
};
export default dbConnection;
