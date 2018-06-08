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
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleOption(currentTarget);
			this.getModalityVal(currentTarget);
			this.setUrlQueryParam(this.getModalityVal(currentTarget));
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
}

