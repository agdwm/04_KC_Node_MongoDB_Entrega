const $ = require('jquery');

export default class LanguageService {
	constructor() {
		this.defaultLang = 'es';
		this.history = window.history;
		this.btnIdiom = $('.idiom_button');
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
		this.setBtnLang(lang);
	}

	getStorageLang() {
		const currentLang = localStorage.getItem('lang');
		this.setUrlLang(currentLang);
		this.setBtnLang(currentLang);
	}

	specifyState() {
		window.addEventListener('popstate', (event) => {
			if (event.state) {
				const stateLang = event.state.lang;
				console.log('lang', stateLang);
				this.setBtnLang(stateLang);
				localStorage.setItem('lang', stateLang);
			}
		}, false);
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
