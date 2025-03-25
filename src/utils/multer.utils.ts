import { Request } from "express";
import path from "path";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const allowedExtension = [".pdf", ".doc"];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const extname = path.extname(file.originalname).toLowerCase();

  if (!allowedExtension.includes(extname)) {
    return cb(new Error("This file type is not allowed"));
  } else {
    return cb(null, true);
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploads;
