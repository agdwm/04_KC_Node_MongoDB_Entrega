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
			this.swithFilter($(e.currentTarget));
			return false;
		});
	}

	swithFilter(btn) {
		btn.toggleClass('active');
	}
}
