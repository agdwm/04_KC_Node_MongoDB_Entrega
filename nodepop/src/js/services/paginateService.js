'use strict';

const $ = require('jquery');


export default class PaginateService {
	constructor() {
		this.currentBtn = 1; // Valor del boton sobre el que se ha pulsado
		this.skip = 0;
		this.limit = parseInt($.trim($('#pagination-limit').attr('data-limit')), 10);

		this.dataSource = [];

		// this.paginationTotalKey = $.trim($('#pagination-total').attr('data-type'));

	}

	setTotalAds() {
		const currentTotalAds = $.trim($('#pagination-total').attr('data-total'));
		$('#pagination-total').attr('data-total', currentTotalAds);
		this.totalAds = parseInt(currentTotalAds, 10);
		console.log('currentTotalAds', currentTotalAds);
		console.log('TotalAds', this.totalAds);
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
	generateCurrentSkip(currentBtn) {
		const currentSkip = ((currentBtn * this.limit) - this.limit);
		this.skip = currentSkip;
		console.log('currentSkip1', this.skip);
	}

	// generateTotalVal() {
	// 	this.skip = this.skip.toString();
	// 	this.limit = this.limit.toString();
	// }

	initPaginate(self, pagContainer) {
		pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: true,
			showGoButton: true,
			showBeginingOnOmit: false,
			showEndingOnOmit: false,
			hideWhenLessThanOnePage: true,
			pageRange: 1,
			prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
			nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
			callback: (data, pagination) => {
				console.log('Load DataSource', this.dataSource);
				const currentBtn = pagination.pageNumber;
				this.generateCurrentSkip(currentBtn);
				self.dataService.createData({ skip: this.skip, limit: this.limit });
				self.loadAds(self.dataService.getData());
			}
		});
	}

	// En este caso necesito pasarle el currentBtn porque la paginacion se 
	// ejecuta despues del generateCurrentSkip. el generateCurrentSkip necesita 
	// ejecutarse antes para renderizar los anuncios
	renderPaginate(self, pagContainer) {
		pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: true,
			showGoButton: true,
			showBeginingOnOmit: false,
			showEndingOnOmit: false,
			pageRange: 1,
			hideWhenLessThanOnePage: true,
			prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
			nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
			callback: (data, pagination) => {
				console.log('Ajax DataSource', this.dataSource);
				const currentBtn = pagination.pageNumber;
				this.generateCurrentSkip(currentBtn);
				console.log('this.skip2', this.skip);

				self.dataService.createData({ skip: this.skip, limit: this.limit });
				self.loadAdsPag(self.dataService.getData());
				// self.generateData(this.skip, this.limit);
				// self.loadAds(self.dataService.getData());
			}
		});		
	}
}
