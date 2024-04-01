const express = require("express");
const chirpstore = require("../chirpstore");

let router = express.Router();

router.get("/", async (req, res) => {
	try {
		const chirps = await chirpstore.GetChirps();
		res.json(chirps);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const chirps = await chirpstore.GetChirp(id);
		res.json(chirps);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		chirpstore.CreateChirp(req.body);
		res.send(200);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

router.put("/:id?", async (req, res) => {
	try {
		const id = req.params.id;
		if (id) {
			chirpstore.UpdateChirp(id, req.body);
			res.send(200);
		} else {
			res.send("No chirp found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

router.delete("/:id?", async (req, res) => {
	try {
		const id = req.params.id;
		if (id) {
			chirpstore.UpdateChirp(id, req.body);
			res.send(204);
		} else {
			res.send("No chirp found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
