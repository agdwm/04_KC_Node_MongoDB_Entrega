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
			this.dataService.setData(this.priceKey, this.priceVal);
			this.loadAds(this.dataService.getData());
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

	loadAds(data) {
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
				}
			},
			(req, status, err) => {
				console.log('something went wrong', status, err );
			}
		);
	}

	renderAds(ads) {
		this.adsContainter.html(ads);
	}
}
