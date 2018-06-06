const $ = require('jquery');

export default class HeaderManager {
	constructor(languageManager) {
		this.languageManager = languageManager;
		this.btnIdiom = $('.idiom_button');
	}

	init() {
		this.setupPopstateHandler();
		this.setupClickEventHandler();
		this.languageManager.checkStorageLang();
	}

	setupPopstateHandler() {
		// Not refactor to jQuery !! It doesn't work!
		window.addEventListener('popstate', (e) => {
			this.languageManager.checkStateLang(e);
		}, false);
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
		this.languageManager.setStorageLang(dataLang);
		this.languageManager.setUrlLang(dataLang);
		this.languageManager.setBtnLang(dataLang);
	}
}
