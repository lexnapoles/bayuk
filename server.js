import path from "path";
import express from "express";


const app      = express(),
			DIST_DIR = path.join(__dirname, "dist"),
			PORT     = 3000;

app.use(express.static(DIST_DIR));

app.get("*", function (req, res) {
	res.sendFile(path.join(DIST_DIR, "index.html"));
});


app.listen(PORT);