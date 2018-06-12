'use strict';

const $ = require('jquery');

export default class AdsListManager {
	constructor(elementSelector, adsService, paginateService) {
		this.adsListView = $(elementSelector);
		this.adsService = adsService;
		this.paginateService = paginateService;
		
	}

	init() {
		// if (this.adsListView.length > 0) {
		// 	this.loadAds();
		// }
	}



}
