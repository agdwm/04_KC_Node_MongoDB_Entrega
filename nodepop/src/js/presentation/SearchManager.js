'use strict';

const $ = require('jquery');

export default class SearchManager {

	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

		this.inputSearch = $('#input-search');
		this.adsContainter = $('#ad-list');
		this.searchKey = '';
		this.searchVal = '';

		this.initSkip = 0;
	}

	init() {
		this.setupKeyUpEventHandler();
	}

	setupKeyUpEventHandler() {
		this.inputSearch.on('keyup', (e) => {
			const currentTarget = $(e.currentTarget);

			this.getSearchKey(currentTarget);
			this.getSearchVal(currentTarget);

			this.dataService.createData({ title: this.searchVal, skip: this.initSkip, limit: 8 });
			this.loadAdsMain(this.dataService.getData());

			return false;
		});
	}

	getSearchKey(input) {
		this.searchKey = input.attr('data-type');
	}

	getSearchVal(input) {
		this.searchVal = input.val();
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
