class Car {
	static list = [];

	static init(cars) {
		console.log(cars);
		this.list = cars.map((i) => new this(i));
	}

	constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt }) {
		this.id = id;
		this.plate = plate;
		this.manufacture = manufacture;
		this.model = model;
		this.image = image;
		this.rentPerDay = rentPerDay;
		this.capacity = capacity;
		this.description = description;
		this.transmission = transmission;
		this.available = available;
		this.type = type;
		this.year = year;
		this.options = options;
		this.specs = specs;
		this.availableAt = availableAt;
	}

	render() {
		return `
			<div class="card h-100">
				<img class="img-fluid" id="img-car" src="${this.image}" alt="${this.manufacture}" />
				<div class="card-body">
					<h2 class="card-title fw-bold" id="car-name">${this.manufacture} ${this.model}/${this.type}</h2>
					<h4 class="card-sub-title fw-bold" id="car-rent">Rp. ${this.rentPerDay} / hari</h4>
					<p class="card-text">${this.description}</p>
					<ul class="list-group car-list">
						<li class="list-group-item">👥${this.capacity} Orang</li>
						<li class="list-group-item">⚙ ${this.transmission}</li>
						<li class="list-group-item">📅 Tahun ${this.year}</li>
					</ul>
				</div>
				<a href="${this.id}" class="d-block w-100 py-2 nav-link success-color text-white fw-bold text-center">Pilih
					Mobil</a>
			</div>
    `;
	}
}
