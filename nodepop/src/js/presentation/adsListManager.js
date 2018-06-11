'use strict';

const $ = require('jquery');

export default class AdsListManager {
	constructor(elementSelector, paginateService) {
		this.adsListView = $(elementSelector);
		this.paginateService = paginateService;
	}

	init() {
		if (this.adsListView.length > 0) {
			// console.log('presente');
		}
	}
}
