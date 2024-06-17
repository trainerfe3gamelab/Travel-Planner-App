const multer = require("multer");

const fileStorageUser = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/images/users");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileStorageAdmin = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/images/tours");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadUser = multer({ storage: fileStorageUser, fileFilter: fileFilter });
const uploadAdmin = multer({
  storage: fileStorageAdmin,
  fileFilter: fileFilter,
});

module.exports = { uploadUser, uploadAdmin };
