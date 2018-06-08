'use strict';
import UrlManager from './UrlManager';

const $ = require('jquery');

export default class FiltersManager extends UrlManager {

	constructor() {
		super();
		this.btnFilter = $('.filter-item');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnFilter.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleFilter(currentTarget);
			this.getFilterVal(currentTarget);
			// this.setUrlQueryParam(this.getFilterVal(currentTarget));
			return false;
		});
	}

	toggleFilter(btn) {
		btn.toggleClass('active');
	}

	getFilterVal(btn) {
		const dataFilterVal = btn.attr('data-filter');
		return dataFilterVal;
	}
}
