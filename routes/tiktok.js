const ttdl = require("tiktok-video-downloader");
const express = require("express");

const router = express.Router();
router.route("/").post(async (req, res) => {
  try {
    const result = await ttdl.getInfo(req.body.url);
    res.status(200).json({
      message: "success",
      data: {
        url: req.body.url,
        originalSound:result.backsound.url,
        nowatermark:result.video.url.no_wm, 
        downloadLink: result.video.url.wm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
