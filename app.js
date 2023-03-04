const express = require("express");
const facebook = require("./routes/facebook");
const tiktok = require("./routes/tiktok");
const instagram = require("./routes/instagram");
const app = express();
app.use(express.json({ limit: "10kb" }));
app.use("/facebook", facebook);
app.use("/tiktok", tiktok);
app.use("/instagram", instagram);
app.listen(process.env.PORT, () => {
  console.log("Express server listening on port 3000");
});
