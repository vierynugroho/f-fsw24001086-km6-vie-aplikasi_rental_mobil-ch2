/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)

//? PARAMS DATA
console.log('DATA PARAMS:');
console.log(params);
console.log('---------------');
let params_driverType = params.driverType;
let params_date = params.date;
let params_pickUpTime = params.pickUpTime;
let params_totalPassenger = params.totalPassenger;

//? GET ELEMENT ACTION
let btn_submit = document.getElementById('btnCariMobil');

btn_submit.addEventListener('click', () => {
	//? FILTER DATA
	let driver_type = document.getElementById('driverType').value;
	let date = document.getElementById('date').value; // 2024 - 03 - 13;
	let pick_up_time = document.getElementById('pickUpTime').value; // 00:00
	let total_passenger = document.getElementById('totalPassenger').value;

	filter_dateTime = new Date(`${date} ${pick_up_time}`);

	//! LOG FILTER DATA
	console.log('DATA FILTER:');
	console.log('Driver Type: ' + driver_type);
	console.log('Tanggal: ' + date);
	console.log('Waktu Ambil: ' + pick_up_time);
	console.log('Jumlah Penumpang: ' + total_passenger);
	console.log('---------------');

	//! CHANGE BUTTON UI WHEN CLICKED or FILTERED
	btn_submit.classList.replace('success-color', 'primary-outline');
	btn_submit.innerText = 'Edit';

	//! VALIDATION INPUT
	//TODO: total_passenger is empty
	if (total_passenger == '') total_passenger = 0;

	//TODO: all input is empty
	if (date == '' && pick_up_time == '' && total_passenger == '0') {
		console.log('empty input');
		const app = new App();
		app.init().then(app.run);
		return;
	}

	//TODO: date or pick up time is empty
	if (date != '' && pick_up_time == '') {
		alert('Masukkan  Waktu Pengambilan Mobil!');
		return;
	} else if (pick_up_time != '' && date == '') {
		alert('Masukkan Tanggal Pengambilan Mobil!');
		return;
	}

	//! VALIDATION FILTER
	let filteredCars;

	//TODO: if passenger empty
	if (total_passenger == '' || total_passenger == null) {
		filteredCars = (car) => car.availableAt <= filter_dateTime && car.available === true;
	}
	//TODO: if date or pick up time empty
	else if (date == '' || date == null || pick_up_time == '' || pick_up_time == null) {
		filteredCars = (car) => car.capacity >= total_passenger && car.available === true;
	}
	//TODO: if all inputs are filled
	else {
		filteredCars = (car) => car.capacity >= total_passenger && car.available === true && car.availableAt <= filter_dateTime;
	}

	//! GET FILTERED CARS
	async function getCarsFiltered() {
		const data = await Binar.listCars(filteredCars);
		return data;
	}

	//! EXC FILTERED CARS
	getCarsFiltered().then((carsFiltered) => {
		console.log(carsFiltered);
		const app = new App();
		Car.init(carsFiltered);
		app.run();
	});
});
