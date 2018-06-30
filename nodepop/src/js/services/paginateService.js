'use strict';

const $ = require('jquery');


export default class PaginateService {
	constructor() {
		this.currentBtn = 1;
		this.skip = 0;
		this.limit = parseInt($.trim($('#pagination-limit').attr('data-limit')), 10);

		this.dataSource = [];
		this.showGoInput = true;
		this.showGoButton = true;
		this.showBeginingOnOmit = false;
		this.showEndingOnOmit = false;
		this.hideWhenLessThanOnePage = true;
		this.pageRange = 1;
		this.prevText = '<i class="glyphicon glyphicon-chevron-left"></i>';
		this.nextText = '<i class="glyphicon glyphicon-chevron-right"></i>';
	}

	setTotalAds() {
		const currentTotalAds = $.trim($('#pagination-total').attr('data-total'));
		$('#pagination-total').attr('data-total', currentTotalAds);
		this.totalAds = parseInt(currentTotalAds, 10);
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

	// self = paginationManager
	initPaginate(self, pagContainer) {
		console.log('LOAD DataSource', this.dataSource);
		pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: this.showGoInput,
			showGoButton: this.showGoButton,
			showBeginingOnOmit: this.showBeginingOnOmit,
			showEndingOnOmit: this.showEndingOnOmit,
			hideWhenLessThanOnePage: this.hideWhenLessThanOnePage,
			pageRange: this.pageRange,
			prevText: this.prevText,
			nextText: this.nextText,
			callback: (data, pagination) => {
				const currentBtn = pagination.pageNumber;
				this.generateCurrentSkip(currentBtn);
				self.dataService.createData({ skip: this.skip, limit: this.limit });
				self.commonManager.loadAds(self.dataService.getData());
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
			showGoInput: this.showGoInput,
			showGoButton: this.showGoButton,
			showBeginingOnOmit: this.showBeginingOnOmit,
			showEndingOnOmit: this.showEndingOnOmit,
			hideWhenLessThanOnePage: this.hideWhenLessThanOnePage,
			pageRange: this.pageRange,
			prevText: this.prevText,
			nextText: this.nextText,
			callback: (data, pagination) => {
				const currentBtn = pagination.pageNumber;
				this.generateCurrentSkip(currentBtn);
				self.dataService.createData({ skip: this.skip, limit: this.limit });
				self.commonManager.loadAdsPag(self.dataService.getData());
			}
		});
	}
}
