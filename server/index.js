const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// activated config .env
dotenv.config();

// get port value from .env
const PORT = process.env.PORT;

const app = express();

// provides access to public folders within the application.
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json()); // pass res.body

// sends the index.html file to the root route (/)
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// sends the cari_mobil.html file to the route (/cars)
app.get('/cars', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'cari_mobil.html'));
});

app.listen(PORT, () => {
	console.log('Express API running in http://localhost:' + PORT);
});
