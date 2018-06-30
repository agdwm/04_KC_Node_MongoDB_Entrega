'use strict';

const $ = require('jquery');

export default class FiltersManager {

	constructor(dataService, commonManager) {

		this.dataService = dataService;
		this.commonManager = commonManager;

		this.btnFilter = $('.filter-item');
		this.adsContainter = $('#ad-list-wrapper');
		this.filterKey = '';
		this.filterVal = '';
		this.initSkip = 0;
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnFilter.on('click', (e) => {
			const self = this;
			const currentTarget = $(e.currentTarget);

			this.toggleFilter(currentTarget);
			this.getFilterKey(currentTarget);
			this.getFilterVal(currentTarget);

			this.dataService.createData({ tags: this.filterVal, skip: this.initSkip, limit: 8 });
			this.commonManager.loadAdsMain(self, this.dataService.getData());

			return false;
		});
	}

	toggleFilter(btn) {
		btn.toggleClass('active');
	}

	getFilterKey(btn) {
		this.filterKey = btn.attr('data-type');
	}

	getFilterVal(btn) {
		this.filterVal = btn.attr('data-value');
	}
}
