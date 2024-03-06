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
	let date = document.getElementById('date').value;
	let pick_up_time = document.getElementById('pickUpTime').value;
	let total_passenger = document.getElementById('totalPassenger').value;

	// let filteredCars = (car) => {
	// 	return car.type === driver_type || car.date === date || car.pick_up_time === pick_up_time || car.capacity === total_passenger;
	// };

	let filteredCars = (car) => car.capacity == total_passenger;

	async function getCarsFiltered() {
		const data = await Binar.listCars(filteredCars);
		return data;
	}

	getCarsFiltered().then((carsFiltered) => {
		console.log(carsFiltered);
		const app = new App();
		Car.init(carsFiltered);
		app.clear();
		app.run();
	});
});

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

app.init().then(app.run);
