const $ = require('jquery');

export default class LanguageService {
	constructor() {
		this.defaultLang = 'es';
		this.history = window.history;
		this.localStorage = localStorage;
		this.btnIdiom = $('.idiom_button');
	}

	checkStorageLang() {
		if (typeof (Storage) !== 'undefined') {
			if (!localStorage.getItem('lang')) {
				this.setStorageLang(this.defaultLang);
				this.setUrlLang(this.defaultLang);
				this.setBtnLang(this.defaultLang);
			} else {
				this.getStorageLang();
				this.setUrlLang(this.getStorageLang());
				this.setBtnLang(this.getStorageLang());
			}
		}
	}

	setStorageLang(lang) {
		this.localStorage.setItem('lang', lang);
	}

	getStorageLang() {
		const currentLang = this.localStorage.getItem('lang');
		return currentLang;
	}

	checkStateLang(e) {
		if (e.state) {
			const stateLang = e.state.lang;
			this.setBtnLang(stateLang);
			this.setStorageLang(stateLang);
		}
	}

	setUrlLang(lang) {
		const stateObj = { lang };
		const url = `?lang=${lang}`;
		this.history.pushState(stateObj, lang, url);
	}

	setBtnLang(lang) {
		this.btnIdiom.removeClass('active');
		$(`.idiom_button[data-lang='${lang}']`).addClass('active');
	}
}
