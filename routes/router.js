const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const HandOut = require("../models/HandOut");

// set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = Router();

// Home URL for student
router.get("/", (req, res, next) => {
  try {
    return res.status(200).render("index");
  } catch (error) {
    next(error);
  }
});

// ND I URL for student
router.get("/ndone", async (req, res, next) => {
  try {
    const handouts = await HandOut.find({ level: "ndone" });
    return res.status(200).render("ndone", {
      handouts,
    });
  } catch (error) {
    next(error);
  }
});

// ND II URL for student
router.get("/ndtwo", async (req, res, next) => {
  try {
    const handouts = await HandOut.find({ level: "ndtwo" });
    return res.status(200).render("ndtwo", {
      handouts,
    });
  } catch (error) {
    next(error);
  }
});

// HND I URL for student
router.get("/hndone", async (req, res, next) => {
  try {
    const handouts = await HandOut.find({ level: "hndone" });
    return res.status(200).render("hndone", {
      handouts,
    });
  } catch (error) {
    next(error);
  }
});

// HND II URL for student
router.get("/hndtwo", async (req, res, next) => {
  try {
    const handouts = await HandOut.find({ level: "hndtwo" });
    return res.status(200).render("hndtwo", {
      handouts,
    });
  } catch (error) {
    next(error);
  }
});

// Admin route (restricted)
router.get("/admin/login", (req, res, next) => {
  try {
    return res.status(200).render("admin-login", {
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// admin login post request
router.post("/auth", async (req, res, next) => {
  try {
    const { adminId, adminPin } = req.body;

    if (!adminId || !adminPin) {
      return res.status(401).render("admin-login", {
        error: "Credentials are required!",
      });
    }

    if (adminId == 1 && adminPin == 1) {
      res.status(301).redirect("/dashboard");
    } else {
      return res.status(401).render("admin-login", {
        error: "Invalid details",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Dashboard
router.get("/dashboard", (req, res) => {
  return res.status(200).render("admin-dashboard", {
    message: null,
  });
});

// upload handout route
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { course_code, course_title, level, term } = req.body;

    if (!course_code || !course_title || !level || !term) {
      return res.status(200).render("admin-dashboard", {
        message: "Credentials are required",
      });
    }

    await HandOut.create({
      course_code,
      level,
      course_title,
      term,
      file: req.file.filename,
    })
      .then(() => {
        return res.status(200).render("admin-dashboard", {
          message: "File uploaded",
        });
      })
      .catch((error) => {
        return res.status(400).render("admin-dashboard", {
          message: "An error occured please try again later",
        });
      });
  } catch (error) {
    return res.status(400).render("admin-dashboard", {
      message: "Please select a file",
    });
  }
});

// download
router.get("/download/:id", async (req, res, next) => {
  try {
    return res
      .status(200)
      .download(path.join(__dirname, "../public/files", req.params.id));
  } catch (error) {
    next(error);
  }
});

router.get("*", (req, res) => {
  return res.status(200).send("Page not found!");
});

module.exports = router;
