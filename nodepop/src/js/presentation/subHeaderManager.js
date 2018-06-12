'use strict';

import UrlManager from './UrlManager';

const $ = require('jquery');

export default class SubHeaderManager extends UrlManager {

	constructor() {
		super();
		this.history = window.history;
		this.btnMain = $('.main_button');
		this.keyModality = 'isSale';
		this.possibleModalities = ['true', 'false'];
		this.adsContainter = $('#ad-list');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleOption(currentTarget);
			this.getModalityVal(currentTarget);
			this.setUrlModality(this.getModalityVal(currentTarget));
			this.loadAds();
			//this.getAdvertisements();
			return false;
		});
	}

	toggleOption(btn) {
		this.btnMain.removeClass('active');
		btn.addClass('active');
	}

	getModalityVal(btn) {
		const dataModality = btn.attr('data-modality');
		return dataModality;
	}

	loadAds() {
		const currentUrlString =  window.location.href;
		// console.log('currentUrlString', currentUrlString);
        $.ajax({
			type: 'GET',
			url: currentUrlString,
			contentType: 'application/json',
			// data: JSON.stringify({peticionAjax: true}),
            success: (advertisements) => {
				this.adsContainter.empty();
				this.adsContainter.html(advertisements);
				// console.log("AJAX", advertisements);
				console.log('currentUrlString', currentUrlString);
			},
            error: (req, status, err) => {
				console.log('something went wrong', status, err );
			}
        });

	}
}

