'use strict';

const $ = require('jquery');

export default class CommonManager {

	constructor(adsService, paginateService) {
		this.adsService = adsService;
		this.paginateService = paginateService;

		this.initSkip = 0;
		this.adsContainter = $('#ad-list-wrapper');

	}

	init() {}

	loadAds(data) {
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

	loadAdsMain(self, data) {
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
					this.paginateService.setTotalAds();
					this.paginateService.setDataSource();
					this.paginateService.renderPaginate(self, $('#pagination'), this.initSkip);
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