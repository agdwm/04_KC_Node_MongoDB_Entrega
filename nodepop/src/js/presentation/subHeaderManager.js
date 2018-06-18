'use strict';

import UrlManager from './UrlManager';

const $ = require('jquery');

export default class SubHeaderManager extends UrlManager {

	constructor(adsService) {
		super();
		this.adsService = adsService;
		this.btnMain = $('.main_button');
		// this.adsContainter = $('#ad-list');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getModalityVal(currentTarget);
			this.setUrlModality(this.getModalityVal(currentTarget));
			this.loadAds();
			return false;
		});
	}

	switchOption(btn) {
		this.btnMain.removeClass('active');
		btn.addClass('active');
	}

	getModalityVal(btn) {
		const dataModality = btn.attr('data-modality');
		return dataModality;
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

