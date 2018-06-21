'use strict';

const $ = require('jquery');

export default class PriceManager {

	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.btnPrice = $('.price-item');
		this.adsContainter = $('#ad-list');
		this.priceKey = '';
		this.priceVal = '';
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnPrice.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getPriceKey(currentTarget);
			this.getPriceVal(currentTarget);
			return false;
		});
	}

	switchOption(btn) {
		this.btnPrice.removeClass('active');
		btn.addClass('active');
	}

	getPriceKey(btn) {
		this.priceKey = btn.attr('data-type');
	}

	getPriceVal(btn) {
		this.filterVal = btn.attr('data-value');
	}
}