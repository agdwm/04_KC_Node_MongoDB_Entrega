'use strict';

const $ = require('jquery');


export default class PaginateService {
	constructor() {
		this.totalTag = $('#pagination-total');
		this.limitTag = $('#pagination-limit');

		this.currentBtn = 1; // Valor del boton sobre el que se ha pulsado
		this.skip = 1;
		this.limit = parseInt($.trim(this.limitTag.attr('data-limit')), 10);

		this.totalAds = parseInt($.trim(this.totalTag.attr('data-total')), 10); // total de anuncios q recibimo en cada petición
		this.dataSource = [];

		this.paginationTotalKey = $.trim(this.totalTag.attr('data-type'));
		this.paginationTotalVal = {};

	}

	// Array with the Total of elements
	setDataSource() { // OK
		const result = [];

		for (let i = 1; i <= this.totalAds; i++) {
			result.push(i);
		}
		this.dataSource = result;
	}

	// Start value of every array of ads
	generateCurrentSkip() {
		const currentSkip = ((this.currentBtn * this.limit) - this.limit) + 1;
		this.skip = currentSkip;
	}

	// create the object 'data' with the attributes {'skip' and 'limit'}
	// this object will be passed to the Ajax request
	generatepaginationTotalVal() {
		this.paginationTotalVal.skip = (this.skip).toString();
		this.paginationTotalVal.limit = (this.limit).toString();
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
				this.generatepaginationTotalVal();
				self.dataService.setData(this.paginationTotalKey, this.paginationTotalVal);
				self.loadAds(self.dataService.getData());
			}
		});
	}
}
