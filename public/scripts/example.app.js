class App {
	constructor() {
		// this.clearButton = document.getElementById("clear-btn")
		this.loadButton = document.getElementById('load-btn');
		this.carContainerElement = document.getElementById('cars-container');
	}

	async init() {
		await this.load();

		// Register click listener
		// this.clearButton.onclick = this.clear;
		this.loadButton.onclick = this.run;
	}

	run = () => {
		this.clear();
		const data = this.filterCar();
		if (data.length == 0 || data == undefined) {
			const node = document.createElement('div');
			node.innerHTML = `<div class="alert alert-danger mt-2" role="alert"> Data Tidak Ditemukan </div>`;
			this.carContainerElement.appendChild(node);
		} else {
			data.forEach((car) => {
				const node = document.createElement('div');
				node.innerHTML = car.render();
				this.carContainerElement.appendChild(node);
			});
		}
	};

	filterCar() {
		const driver = document.getElementById('driver').value;
		const date = document.getElementById('date').value;
		const time = document.getElementById('time').value;
		const dateTime = new Date(`${date} ${time}`);
		const passenger = document.getElementById('passenger').value;
		if (driver === undefined || driver === '') {
			alert('Please select a driver');
			return;
		} else if (passenger == '' && driver.toString() == 'true') {
			return Car.list.filter((car) => car.available === true && car.availableAt <= dateTime);
		} else if (passenger != '' && driver.toString() == 'true') {
			return Car.list.filter((car) => car.available === true && car.capacity >= passenger && car.availableAt <= dateTime);
		} else if (passenger == '' && driver.toString() == 'false') {
			return Car.list.filter((car) => car.available === false && car.availableAt <= dateTime);
		} else if (passenger != '' && driver.toString() == 'false') {
			return Car.list.filter((car) => car.available === false && car.capacity >= passenger && car.availableAt <= dateTime);
		}
	}

	async load() {
		const cars = await Binar.listCars();
		Car.init(cars);
	}

	clear = () => {
		let child = this.carContainerElement.firstElementChild;

		while (child) {
			child.remove();
			child = this.carContainerElement.firstElementChild;
		}
	};
}

function rupiah(number) {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(number);
}

function getDateTimeNow() {
	var today = new Date();
	var date = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
	var time = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0') + ':' + String(today.getSeconds()).padStart(2, '0');
	var dateNow = date + 'T' + time + '.000Z';
	return dateNow;
}
