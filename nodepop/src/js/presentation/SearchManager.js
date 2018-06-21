'use strict';

const $ = require('jquery');

export default class SearchManager {

	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.inputSearch = $('#input-search');
		this.adsContainter = $('#ad-list');
		this.searchKey = '';
		this.searchVal = '';
	}

	init() {
		this.setupKeyUpEventHandler();
	}

	setupKeyUpEventHandler() {
		this.inputSearch.on('keyup', (e) => {
			const currentTarget = $(e.currentTarget);

			this.getSearchKey(currentTarget);
			this.getSearchVal(currentTarget);
			this.dataService.setData(this.searchKey, this.searchVal);
			this.loadAds(this.dataService.getData());
			return false;
		});
	}

	getSearchKey(input) {
		this.searchKey = input.attr('data-type');
	}

	getSearchVal(input) {
		this.searchVal = input.val();
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
				console.log('something went wrong', status, err);
			}
		);
	}

	renderAds(ads) {
		this.adsContainter.html(ads);
	}
}
