const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config(); // mengaktifkan config .env
const PORT = process.env.PORT; // get env value

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(express.json()); // pass res.body

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/cars', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'cari_mobil.html'));
});

app.listen(PORT, () => {
	console.log('Express API running in http://localhost:' + PORT);
});
