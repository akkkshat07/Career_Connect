import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv"; // Import dotenv

dotenv.config({ path: "./config/config.env" }); // Correctly configure dotenv
console.log(process.env.CLOUDINARY_API_KEY);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
