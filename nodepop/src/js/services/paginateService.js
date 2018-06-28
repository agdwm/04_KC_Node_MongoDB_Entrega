'use strict';

const $ = require('jquery');


export default class PaginateService {
	constructor() {
		this.currentBtn = 1; // Valor del boton sobre el que se ha pulsado
		this.skip = 0;
		this.limit = parseInt($.trim($('#pagination-limit').attr('data-limit')), 10);

		this.totalAds = parseInt($.trim($('#pagination-total').attr('data-total')), 10); // total de anuncios q recibimo en cada petición
		this.dataSource = [];
	}

	// Array with the Total of elements
	setDataSource() { // OK
		const result = [];

		for (let i = 0; i < this.totalAds; i++) {
			result.push(i);
		}
		this.dataSource = result;
	}

	// Start value of every array of ads
	generateCurrentSkip() {
		const currentSkip = ((this.currentBtn * this.limit) - this.limit);
		this.skip = currentSkip;
	}

	initPaginate(self, pagContainer) {
		pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: true,
			showGoButton: true,
			showBeginingOnOmit: false,
			showEndingOnOmit: false,
			pageRange: 1,
			prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
			nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
			callback: (data, pagination) => {
				this.currentBtn = pagination.pageNumber;
				this.generateCurrentSkip();
				self.generateData(this.skip, this.limit);
				self.loadAds(self.dataService.getData());
			}
		});
	}
}
