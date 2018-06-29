'use strict';

const $ = require('jquery');

export default class PaginationManager {
	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

		this.dataSource = [];
		this.pagContainer = $('#pagination');
		this.adsContainter = $('#ad-list-wrapper');
		this.totalAds = parseInt($.trim($('#pagination-total').attr('data-total')), 10); // total de anuncios q recibimo en cada petición
	}

	init() {
		this.setupLoadEventHandler();
	}

	setupLoadEventHandler() {
		const self = this;

		if (this.dataSource.length < 1) {
			this.paginateService.setTotalAds();
			this.paginateService.setDataSource();
		}
		this.paginateService.initPaginate(self, this.pagContainer);
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
