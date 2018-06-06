const $ = require('jquery');

export default class HeaderManager {
	constructor(languageService) {
		this.languageService = languageService;
		this.btnIdiom = $('.idiom_button');
	}

	init() {
		this.setupClickEventHandler();
		this.languageService.specifyState();
		this.languageService.checkStorageLang();
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
		const dataLang = btn.attr('data-lang');
		this.languageService.setStorageLang(dataLang);
	}
}
