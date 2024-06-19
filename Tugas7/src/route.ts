import express from "express";
import cloudinary from "./utils/cloudinary";
import { single, multiple } from "./middlewares/upload.middleware";

const router = express.Router();

router.post("/upload/single", single, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(req.file!.buffer); // non-null assertion
    });
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/upload/multiple", multiple, async (req, res) => {
  if (!req.files || !Array.isArray(req.files)) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const uploadPromises = req.files.map(file => {
      return new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }).end(file.buffer); // non-null assertion
      });
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map(result => result.secure_url);
    res.status(200).json({ urls });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
