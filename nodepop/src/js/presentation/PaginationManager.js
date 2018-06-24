'use strict';

const $ = require('jquery');

export default class PaginationManager {

	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;
		// this.paginateService = paginateService;
		this.adsContainter = $('#ad-list');
		this.btnPagination = $('.paginationjs-pages li');
		this.skip = 1; // start
		this.limit = 8; // items per page
		this.infoTag = $('#pagination-info');
		this.totalAds = 0;
		this.dataSource = [];
		this.paginationKey = this.infoTag.attr('data-type');
		this.paginationVal = {};
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		// $('#pagination').on('click', '.paginationjs-pages li', (e) => {
		this.btnPagination.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.getCurrentPage(currentTarget);
			this.getTotalAds(); // current number of advertisements -> 26
			this.generatePaginationVal();
			this.dataService.setData(this.paginationKey, this.paginationVal);
			this.loadAds(this.dataService.getData());

			// this.generateDataSource();
			// this.paginateService.paginate(this.dataSource, this.limit, );
			return false;
		});
	}

	getCurrentPage(btn) {
		this.skip = parseFloat(btn.attr('data-num'), 10);
		console.log('SKIP', $.type(this.skip));
		// console.log('PER PAGE', this.limit);
	}

	generatePaginationVal() {
		this.paginationVal.skip = (this.skip).toString();
		this.paginationVal.limit = (this.limit).toString();
	}

	getTotalAds() {
		this.totalAds = parseInt(this.infoTag.attr('data-total'), 10);
		return this.totalAds;
	}

	generateDataSource() {
		const result = [];
		//const itemsPerPage = (this.skip * this.limit) - this.limit;

		for (let i = this.skip; i < this.totalAds + 1; i++) {
			result.push(i);
		}
		console.log("SKIP1", this.skip);
		console.log("TOTALAds", this.totalAds);
		console.log("RESULT", result);
		this.dataSource = result;
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
