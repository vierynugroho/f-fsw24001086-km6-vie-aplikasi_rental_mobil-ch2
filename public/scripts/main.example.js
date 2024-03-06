/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)

// params data
console.log(params);
let params_driverType = params.driverType;
let params_date = params.date;
let params_pickUpTime = params.pickUpTime;
let params_totalPassenger = params.totalPassenger;

// btn action
let btn_submit = document.getElementById('btnCariMobil');

btn_submit.addEventListener('click', () => {
	// filter data
	let driver_type = document.getElementById('driverType').value;
	let date = document.getElementById('date').value; // 2024 - 03 - 13;
	let pick_up_time = document.getElementById('pickUpTime').value; // 00:00 (default)
	let total_passenger = document.getElementById('totalPassenger').value;

	filter_dateTime = new Date(`${date} ${pick_up_time}`);

	//! Validation empty input
	if (date == '' && pick_up_time == '' && total_passenger == '') {
		const app = new App();
		app.init().then(app.run);
		return;
	}

	console.log('input date: ' + filter_dateTime);
	//! validation type driver
	// if (driver_type === undefined || driver_type == '') {
	// 	alert('Silahkan Pilih Tipe Driver');
	// 	return;
	// }

	//! Validation Filter
	let filteredCars;
	if (total_passenger == '' || total_passenger == null) {
		filteredCars = (car) => car.availableAt <= filter_dateTime && car.available === true;
	} else {
		filteredCars = (car) => car.capacity >= total_passenger && car.available === true;
	}

	//! Log Hasil
	console.log('Driver Type: ' + driver_type);
	console.log('Tanggal: ' + date);
	console.log('Waktu Ambil: ' + pick_up_time);
	console.log('Jumlah Penumpang: ' + total_passenger);

	async function getCarsFiltered() {
		const data = await Binar.listCars(filteredCars);
		return data;
	}

	getCarsFiltered().then((carsFiltered) => {
		console.log(carsFiltered);
		const app = new App();
		Car.init(carsFiltered);
		app.run();
	});
});

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

app.init().then(app.run);
