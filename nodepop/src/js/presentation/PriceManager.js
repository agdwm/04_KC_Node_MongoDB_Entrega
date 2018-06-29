'use strict';

const $ = require('jquery');

export default class PriceManager {

	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

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
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getPriceKey(currentTarget);
			this.getPriceVal(currentTarget);

			this.dataService.createData({ price: this.priceVal, skip: this.initSkip, limit: 8  });
			this.loadAdsMain(this.dataService.getData());

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

	loadAdsMain(data) {
		const self = this;
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
					this.paginateService.setTotalAds();
					this.paginateService.setDataSource();
					self.paginateService.renderPaginate(self, $('#pagination'), this.initSkip);
				}
			},
			(req, status, err) => {
				console.log('something went wrong', status, err);
			}
		);
	}

	loadAdsPag(data) {
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
				}
			},
			(req, status, err) => {
				console.log('something went wrong', status, err);
			}
		);
	}

	renderAds(ads) {
		this.adsContainter.html(ads);
	}
}
