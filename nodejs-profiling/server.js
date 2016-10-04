"use strict";
const crypto = require('crypto');
function hash (password, cb) {
	const salt = crypto.randomBytes(128).toString('base64');
	const hash = crypto.pbkdf2(password, salt, 10000, 512, cb);
	return hash;
}

// Imagine the loop below is real requests to some route
for (let i = 0; i < 50; i++) {
	hash('random_password',
		(error, hash) => console.log(hash)
	);
}