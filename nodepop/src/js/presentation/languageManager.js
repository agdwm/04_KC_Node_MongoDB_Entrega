const $ = require('jquery');

export default class LanguageService {
	constructor() {
		this.defaultLang = 'es';
		this.possibleLangs = ['es', 'en'];
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
				const storgeLangVal = this.getStorageLang();
				this.setUrlLang(storgeLangVal);
				this.setBtnLang(storgeLangVal);
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

		const currentUrl = window.location.href;
		const currentUrlString =  window.location.search;
		const currentUrlPath = currentUrl.replace(currentUrlString, '');
		const currentUrlPathToArray = currentUrlPath.split('/');

		let position = 0;

		// On first load
		let url = `${currentUrl}${lang}`;

		const stateObj = { lang };

		// check if 'lang' already exists in the url
		for (let i = 0; i < this.possibleLangs.length; i++) {
			if (currentUrlPathToArray.indexOf(this.possibleLangs[i]) >= 0) {
				position = currentUrlPathToArray.indexOf(this.possibleLangs[i]);
				break;
			}
		}

		if (position !== 0) {
			currentUrlPathToArray[position] = lang;
			url = currentUrlPathToArray.join('/');
		}

		this.history.pushState(stateObj, lang, `${url}${currentUrlString}`);
	}

	setBtnLang(lang) {
		this.btnIdiom.removeClass('active');
		$(`.idiom_button[data-lang='${lang}']`).addClass('active');
	}
}
