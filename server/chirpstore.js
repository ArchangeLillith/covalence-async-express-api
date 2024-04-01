const fs = require("fs");
let chirps = { nextid: 0 };

if (fs.existsSync("chirps.json")) {
	chirps = JSON.parse(fs.readFileSync("chirps.json"));
}

const requestShouldBreak = () => {
	return 1 / 4 > Math.random();
};

let getChirps = () => {
	return new Promise((res, rej) => {
		if (requestShouldBreak()) rej("Database errorr- couldn't do the thing");
		else res(Object.assign({}, chirps));
	});
};

let getChirp = (id) => {
	return new Promise((res, rej) => {
		if (requestShouldBreak()) rej("Database errorr- couldn't do the thing");
		else res(Object.assign({}, chirps[id]));
	});
};

let createChirp = (chirp) => {
	return new Promise((res, rej) => {
		if (requestShouldBreak()) {
			rej("Database errorr- couldn't do the thing");
		} else {
			chirps[chirps.nextid++] = chirp;
			writeChirps();
			res("Success, added chirp");
		}
	});
};

let updateChirp = (id, chirp) => {
	return new Promise((res, rej) => {
		if (requestShouldBreak()) {
			rej("Database errorr- couldn't do the thing");
		} else {
			chirps[id] = chirp;
			writeChirps();
			res("Chirp updated");
		}
	});
};

let deleteChirp = (id) => {
	return new Promise((res, rej) => {
		if (requestShouldBreak()) {
			rej("Database errorr- couldn't do the thing");
		} else {
			delete chirps[id];
			writeChirps();
			res("Chirp deleted, 204");
		}
	});
};

let writeChirps = () => {
	return fs.promises.writeFile("chirps.json", JSON.stringify(chirps));
};

module.exports = {
	CreateChirp: createChirp,
	DeleteChirp: deleteChirp,
	GetChirps: getChirps,
	GetChirp: getChirp,
	UpdateChirp: updateChirp,
};
