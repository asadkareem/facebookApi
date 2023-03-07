
const express = require("express");
const https=require("https")



const router = express.Router();
router.route("/").post(async (req, res) => {
    // input video url
    let inputVideoUrl = req.body.url;
    // check is there ending slash and remove it
    if (inputVideoUrl.slice(-1) === '/') {
        inputVideoUrl = inputVideoUrl.slice(0, -1);
    }
    // get video id from url
    const videoId = inputVideoUrl.split('/').pop();
       const videoJsonConfigUrl = `https://player.vimeo.com/video/${videoId}/config`;
    // get video json config
    const videoConfig = await new Promise((resolve, reject) => {
        https.get(videoJsonConfigUrl, (res) => {
            let result = '';
            res.on('data', data => {
                result += data;
            });
            res.on('error', err => {
                reject(err);
            });
            res.on('end', () => {
                resolve(JSON.parse(result));
            });
        });
    });
    console.log(videoConfig.request.files.progressive);
    const response={
    }
    if(videoConfig.request.files.progressive[0] && videoConfig.request.files.progressive[0].url){
        response.fullhd=videoConfig.request.files.progressive[0].url
    }
    if(videoConfig.request.files.progressive[1] && videoConfig.request.files.progressive[1].url){
        response.hd=videoConfig.request.files.progressive[1].url
    }
    if(videoConfig.request.files.progressive[2] && videoConfig.request.files.progressive[2].url){
        response.sd=videoConfig.request.files.progressive[2].url
    }
    
 res.status(200).json({
  status:"success",
  data:{
    response
  }
 })

});

module.exports = router;
