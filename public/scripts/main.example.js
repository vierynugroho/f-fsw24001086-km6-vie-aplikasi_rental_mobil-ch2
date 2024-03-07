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
	let pick_up_time = document.getElementById('pickUpTime').value; // 00:00
	let total_passenger = document.getElementById('totalPassenger').value;

	filter_dateTime = new Date(`${date} ${pick_up_time}`);

	//! change UI button to edit button
	btn_submit.classList.replace('success-color', 'primary-outline');
	btn_submit.innerText = 'Edit';

	//! Validation empty input
	//TODO: if total_passenger is empty
	if (total_passenger == '') total_passenger = 0;

	//TODO: if pick up time is empty
	if (date != '' && pick_up_time == '') {
		alert('Masukkan Jam Pengambilan Mobil!');
		return;
	}

	//TODO: all input is empty
	if (date == '' && pick_up_time == '' && total_passenger == '0') {
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

	console.log(total_passenger);

	//! Validation Filter
	let filteredCars;
	if (total_passenger == '' || total_passenger == null) {
		console.log('atas');
		filteredCars = (car) => car.availableAt <= filter_dateTime && car.available === true;
	} else {
		console.log('bawah');
		filteredCars = (car) => car.capacity >= total_passenger && car.available === true;
	}

	//! Log Hasil Pilih Mobil
	console.log('Driver Type: ' + driver_type);
	console.log('Tanggal: ' + date);
	console.log('Waktu Ambil: ' + pick_up_time);
	console.log('Jumlah Penumpang: ' + total_passenger);

	//! get filtered cars
	async function getCarsFiltered() {
		const data = await Binar.listCars(filteredCars);
		return data;
	}

	//! exc filtered cars
	getCarsFiltered().then((carsFiltered) => {
		console.log(carsFiltered);
		const app = new App();
		Car.init(carsFiltered);
		app.run();
	});
});
