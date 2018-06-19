'use strict';

import UrlManager from '../services/UrlService';

const $ = require('jquery');

export default class SubHeaderManager {

	constructor(adsService, urlService) {
		this.adsService = adsService;
		this.urlService = urlService;
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
			this.urlService.setData(this.modalityKey, this.modalityVal);

			console.log('DATA', this.urlService.getData());
			// this.loadAds();
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

	loadAds() {
		const currentUrl = this.newUrl;

		this.adsService.getList(
			currentUrl,
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

