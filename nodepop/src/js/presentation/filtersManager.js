'use strict';

import UrlManager from '../services/UrlService';

const $ = require('jquery');

export default class FiltersManager {

	constructor(adsService, urlService) {
		this.adsService = adsService;
		this.urlService = urlService;
		this.btnFilter = $('.filter-item');
		this.filterKey = '';
		this.filterVal = '';
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnFilter.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleFilter(currentTarget);
			this.getFilterKey(currentTarget);
			this.getFilterVal(currentTarget);
			this.urlService.setData(this.filterKey, this.filterVal);

			console.log('DATA', this.urlService.getData());
			// this.loadAds();
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

	loadAds() {
		const currentUrl = this.newUrl;

		this.adsService.getList(
			currentUrl,
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
