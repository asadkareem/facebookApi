const express = require("express");
const instagramGetUrl = require("instagram-url-direct");
const router = express.Router();
// Create an instance

router.route("/").post(async (req, res) => {
  try {
    let links = await instagramGetUrl(req.body.url);
    res.status(200).json({
      url: req.body.url,
      downloadLink: links.url_list,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
