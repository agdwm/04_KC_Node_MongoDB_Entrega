'use strict';

const $ = require('jquery');

export default class FiltersManager {

	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.btnFilter = $('.filter-item');
		this.adsContainter = $('#ad-list');
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
			this.dataService.setData(this.filterKey, this.filterVal);
			this.loadAds(this.dataService.getData());
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
