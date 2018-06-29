'use strict';

const $ = require('jquery');

export default class FiltersManager {

	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

		this.btnFilter = $('.filter-item');
		this.adsContainter = $('#ad-list');
		this.filterKey = '';
		this.filterVal = '';
		this.initSkip = 1;
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

			this.dataService.createData({ tags: this.filterVal, skip: this.initSkip, limit: 8 });
			this.loadAdsMain(this.dataService.getData());

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
