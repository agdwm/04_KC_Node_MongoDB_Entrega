'use strict';

import UrlManager from './UrlManager';

const $ = require('jquery');

export default class FiltersManager extends UrlManager {

	constructor(adsService) {
		super();
		this.adsService = adsService;
		this.btnFilter = $('.filter-item');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnFilter.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleFilter(currentTarget);
			this.getFilterVal(currentTarget);
			this.setUrlFilter(this.getFilterVal(currentTarget));
			this.loadAds();
			return false;
		});
	}

	toggleFilter(btn) {
		btn.toggleClass('active');
	}

	getFilterVal(btn) {
		const dataFilter = btn.attr('data-filter');
		return dataFilter;
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
