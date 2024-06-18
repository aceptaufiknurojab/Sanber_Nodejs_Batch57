import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import cloudinary from "./cloudinaryConfig"

const port = 8080;
const app = express();

// Middleware untuk mengelola pengunggahan file
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Route untuk mengunggah singgle file
app.post("/single", (req, res) => {
  const photo = (req.files?.photo as fileUpload.UploadedFile);

  if (!photo) {
    res.status(400).json({ status: 400, message: "Photo is required" });
    return;
  }

  cloudinary.uploader.upload(
    photo.tempFilePath,
    {
      public_id: new Date().getTime().toString(),
    },
    (error: any, result: any) => {
      if (error) {
        res.status(500).json({ status: 500, message: "Upload failed", error });
      } else {
        res.json({ status: 200, message: "Success", result });
      }
    }
  );
});

//Route untuk upload multiple file
app.post("/multiple", async (req, res) => {
  const files = req.files?.photo;

  if (!files) {
    res.status(400).json({ status: 400, message: "Photos are required" });
    return;
  }

  // Pastikan files adalah array
  const photoArray = Array.isArray(files) ? files : [files];

  try {
    const uploadPromises = photoArray.map((photo) => {
      const file = photo as fileUpload.UploadedFile;
      return cloudinary.uploader.upload(file.tempFilePath, {
        public_id: new Date().getTime().toString(),
      });
    });

    const results = await Promise.all(uploadPromises);
    res.json({ status: 200, message: "Success", results });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Upload failed", error });
  }
});

app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});
