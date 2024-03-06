class App {
	constructor() {
		this.clearButton = document.getElementById('clear-btn');
		this.loadButton = document.getElementById('load-btn');
		this.carContainerElement = document.getElementById('cars-container');
	}

	async init() {
		await this.load();

		// Register click listener
		this.clearButton.onclick = this.clear;
		this.loadButton.onclick = this.run;
	}

	run = () => {
		this.clear();
		if (Car.list.length == 0 || Car.list.length == undefined) {
			let car_container = document.getElementById('cars-container');
			car_container.innerHTML = `
			<div class="alert alert-danger text-center fw-bold mt-2" role="alert"> Mobil Tidak Tersedia! </div>
			`;
		} else {
			Car.list.forEach((car) => {
				const node = document.createElement('div');
				node.classList.add('col-12');
				node.classList.add('col-md-4');
				node.classList.add('mt-3');
				node.innerHTML = car.render();
				this.carContainerElement.appendChild(node);
			});
		}
	};

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
