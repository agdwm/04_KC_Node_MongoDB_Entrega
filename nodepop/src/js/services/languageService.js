const $ = require('jquery');

export default class LanguageService {
	constructor() {
		this.defaultLang = 'es';
	}

	checkStorageLang() {
		if (typeof (Storage) !== 'undefined') {
			if (!localStorage.getItem('lang')) {
				this.setStorageLang(this.defaultLang);
			} else {
				this.getStorageLang();
			}
		}
	}

	setStorageLang(lang) {
		localStorage.setItem('lang', lang);
		this.setUrlLang(lang);
	}

	getStorageLang() {
		const currentLang = localStorage.getItem('lang');
		this.setUrlLang(currentLang);
	}

	setUrlLang(lang) {
		const url = `?lang=${lang}`;
		history.pushState(lang, lang, url);
	}

}