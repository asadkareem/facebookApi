const express = require("express");
const Deshortifier = require("deshortify");
const getFBInfo = require("fb-downloader");
const router = express.Router();
let deshortifier = new Deshortifier({ verbose: true });
router.route("/").post(async (req, res) => {
  try {
    const url = req.body.url;
    const originalurl = await deshortifier.deshortify(url);
    const info = await getFBInfo(originalurl);
    res.status(200).json({
      message: "success",
      data: info,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
