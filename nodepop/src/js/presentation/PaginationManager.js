'use strict';

const $ = require('jquery');

export default class PaginationManager {
	constructor(dataService, paginateService, commonManager) {

		this.dataService = dataService;
		this.paginateService = paginateService;
		this.commonManager = commonManager;

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
}
