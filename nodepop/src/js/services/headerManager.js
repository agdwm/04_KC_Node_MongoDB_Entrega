const $ = require('jquery');

export default class HeaderManager {
	constructor() {
		this.btnIdiom = $('.idiom_button');
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnIdiom.on('click', (e) => {
			this.switchIdiom($(e.currentTarget));
			return false;
		});
	}

	switchIdiom(btn) {
		this.btnIdiom.removeClass('active');
		btn.addClass('active');
	}
}
