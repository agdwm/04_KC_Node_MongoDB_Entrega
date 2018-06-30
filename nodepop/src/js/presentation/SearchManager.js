'use strict';

const $ = require('jquery');

export default class SearchManager {

	constructor(dataService, commonManager) {

		this.dataService = dataService;
		this.commonManager = commonManager;

		this.inputSearch = $('#input-search');
		this.adsContainter = $('#ad-list-wrapper');
		this.searchKey = '';
		this.searchVal = '';

		this.initSkip = 0;
	}

	init() {
		this.setupKeyUpEventHandler();
	}

	setupKeyUpEventHandler() {
		this.inputSearch.on('keyup', (e) => {
			const self = this;
			const currentTarget = $(e.currentTarget);

			this.getSearchKey(currentTarget);
			this.getSearchVal(currentTarget);

			this.dataService.createData({ title: this.searchVal, skip: this.initSkip, limit: 8 });
			this.commonManager.loadAdsMain(self, this.dataService.getData());

			return false;
		});
	}

	getSearchKey(input) {
		this.searchKey = input.attr('data-type');
	}

	getSearchVal(input) {
		this.searchVal = input.val();
	}
}
