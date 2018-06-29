'use strict';

const $ = require('jquery');

export default class SubHeaderManager {

	constructor(adsService, dataService, paginateService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.paginateService = paginateService;

		this.btnMain = $('.main_button');
		this.adsContainter = $('#ad-list');
		this.modalityKey = '';
		this.modalityVal = '';

		this.initSkip = 0;
		this.currentBtn = 1;
		this.object = [];
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getModalityKey(currentTarget);
			this.getModalityVal(currentTarget);

			this.dataService.createData({ isSale: this.modalityVal, skip: this.initSkip, limit: 8 });
			this.loadAdsMain(this.dataService.getData());

			return false;
		});
	}

	getCurrentBtn(btn) {
		const currentBtn = $.trim(btn.attr('data-num'));
		this.currentBtn = currentBtn;
		console.log('PAGE NUMBER', currentBtn);
	}

	switchOption(btn) {
		this.btnMain.removeClass('active');
		btn.addClass('active');
	}

	getModalityKey(btn) {
		this.modalityKey = btn.attr('data-type');
	}

	getModalityVal(btn) {
		this.modalityVal = btn.attr('data-value');
	}

	generateData(paginationTotalKey, paginationTotalVal) {
		this.dataService.setData(paginationTotalKey, paginationTotalVal);
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

