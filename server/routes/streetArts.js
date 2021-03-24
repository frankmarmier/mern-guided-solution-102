const express = require("express");
const router = new express.Router();
const StreetArt = require("../models/StreetArt");
const uploader = require("../configs/cloudinary");

router.get("/", (req, res, next) => {
  StreetArt.find()
    .then((streetArtDocuments) => {
      res.status(200).json(streetArtDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  StreetArt.findById(req.params.id)
    .then((streetArtDocument) => {
      res.status(200).json(streetArtDocument);
    })
    .catch(next);
});

// POST /api/street-arts
// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post("/", uploader.single("picture"), (req, res, next) => {
  let { lat, lng } = req.body;
  let pictureUrl = req.file.path;

  if (!pictureUrl) {
    return res.status(400).json({ message: "Image required" });
  }

  StreetArt.create({
    pictureUrl,
    location: {
      coordinates: [lng, lat],
    },
  })
    .then((createdStreetArt) => {
      res.json(createdStreetArt);
    })
    .catch((err) => next(err));
});

module.exports = router;
