'use strict';

const $ = require('jquery');

export default class PriceManager {

	constructor(dataService, commonManager) {

		this.dataService = dataService;
		this.commonManager = commonManager;

		this.btnPrice = $('.price-item');
		this.adsContainter = $('#ad-list-wrapper');
		this.priceKey = '';
		this.priceVal = '';

		this.initSkip = 0;
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnPrice.on('click', (e) => {
			const self = this;
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getPriceKey(currentTarget);
			this.getPriceVal(currentTarget);

			this.dataService.createData({ price: this.priceVal, skip: this.initSkip, limit: 8  });
			this.commonManager.loadAdsMain(self, this.dataService.getData());

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
		this.priceVal = btn.attr('data-value');
	}
}
