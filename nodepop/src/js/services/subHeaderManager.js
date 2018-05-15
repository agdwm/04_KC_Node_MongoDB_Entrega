const $ = require('jquery');

export default class SubHeaderManager {
	constructor() {
		this.btnMain = $('.main_button');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			this.toggleOption($(e.currentTarget));
			return false;
		});
	}

	toggleOption(btn) {
		btn.toggleClass('active');
	}
}
