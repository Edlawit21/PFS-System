const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import UUID for unique ID generation

// Storage configuration for profile images
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads/profile-images/"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// Multer instance for profile images
const profileUpload = multer({
  storage: profileStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed.")
    );
  },
});

// Storage configuration for documents and images
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads/documents/"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// Multer instance for documents and images
const documentUpload = multer({
  storage: documentStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Invalid file type. Only PDF, DOC, DOCX, JPEG, JPG, and PNG files are allowed."
      )
    );
  },
});

// Storage configuration for signatures
const signatureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads/signature/")); // Change this path to where you want to store signatures
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// Multer instance for signatures
const signatureUpload = multer({
  storage: signatureStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit for signatures
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Allow only image formats for signatures
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, and PNG files are allowed for signatures."
      )
    );
  },
});

module.exports = { profileUpload, documentUpload, signatureUpload };
