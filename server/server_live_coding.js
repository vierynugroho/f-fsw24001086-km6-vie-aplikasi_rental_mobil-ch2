//! core package (built in node js)
const http = require('http');
const fs = require('fs');
const path = require('path');

//! third party package
const url = require('url');

const PUBLIC_DIR = path.join(__dirname, '../public');
const PORT = 2000;

const server = (req, res) => {
	if (req.url === '/') {
		fs.readFile(`${PUBLIC_DIR}/index.html`, (err, data) => {
			if (err) {
				res.end('404');
			} else {
				res.end(data);
			}
		});
	} else if (req.url === '/cars') {
		fs.readFile(`${PUBLIC_DIR}/cari_mobil.html`, (err, data) => {
			if (err) {
				res.end('404');
			} else {
				res.end(data);
			}
		});
	} else {
		res.end('404');
	}
};

http.createServer(server).listen(PORT);
console.log(`Server running in http://localhost:${PORT}`);
