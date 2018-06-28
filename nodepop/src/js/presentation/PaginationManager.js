'use strict';

const $ = require('jquery');

export default class PaginationManager {
	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

		this.dataSource = [];
		this.pagContainer = $('#pagination');
		this.adsContainter = $('#ad-list');

		this.paginationTotalKey = $.trim($('#pagination-total').attr('data-type'));
		this.paginationTotalVal = {};
	}

	init() {
		this.setupLoadEventHandler();
	}

	setupLoadEventHandler() {
		const self = this;

		if (this.dataSource.length < 1) {
			this.paginateService.setDataSource();
		}
		this.paginateService.initPaginate(self, this.pagContainer);
	}

	generateData(skip, limit) {
		this.paginationTotalVal.skip = skip.toString();
		this.paginationTotalVal.limit = limit.toString();
		this.dataService.setData(this.paginationTotalKey, this.paginationTotalVal);
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
