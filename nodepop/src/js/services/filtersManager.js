const $ = require('jquery');

export default class FiltersManager {
	constructor() {
		this.btnFilter = $('.filter-item');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnFilter.on('click', (e) => {
			this.toggleFilter($(e.currentTarget));
			return false;
		});
	}

	toggleFilter(btn) {
		btn.toggleClass('active');
	}

	
}
