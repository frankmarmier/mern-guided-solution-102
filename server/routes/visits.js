const express = require("express");
const router = new express.Router();
const Visit = require("../models/Visit");

router.get("/my-visits", (req, res, next) => {
  Visit.find({ _user: req.session.currentUser._id })
    .then((visitDocuments) => {
      res.status(200).json(visitDocuments);
    })
    .catch(next);
});

router.post("/visits", (req, res, next) => {
  const { _streetArt } = req.body;

  const newVisit = {
    _streetArt,
    _user: req.session.currentUser._id,
  };

  Visit.create(newVisit)
    .then((createdVisit) => {
      res.status(200).json(createdVisit);
    })
    .catch(next);
});

router.delete("/visits/:visitId", (req, res, next) => {
  Visit.findById(req.params.visitId)
    .then((visitDocument) => {
      if (!visitDocument) {
        next({
          message: "There is no visit",
          status: 400,
        });
      } else if (
        visitDocument._user.toString() !==
        req.session.currentUser._id.toString()
      ) {
        next({
          message: "You cannot delete the visit",
          status: 403,
        });
      } else {
        Visit.findByIdAndDelete(req.params.id)
          .then((deletedVisit) => {
            res.status(200).json({
              message: "The visit was successfully deleted",
            });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
