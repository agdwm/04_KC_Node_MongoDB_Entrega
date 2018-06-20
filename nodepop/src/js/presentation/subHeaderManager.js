'use strict';

const $ = require('jquery');

export default class SubHeaderManager {

	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;
		this.btnMain = $('.main_button');
		this.adsContainter = $('#ad-list');
		this.modalityKey = '';
		this.modalityVal = '';
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
			this.dataService.setData(this.modalityKey, this.modalityVal);
			this.loadAds(this.dataService.getData());
			return false;
		});
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

