const $ = require('jquery');

export default class SubHeaderManager {
	constructor() {
		this.history = window.history;
		this.btnMain = $('.main_button');
		this.keyModality = 'isSale';
		this.possibleModalities = ['true', 'false'];
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const currentTarget = $(e.currentTarget);

			this.toggleOption(currentTarget);
			this.getModalityVal(currentTarget);
			this.setUrlModality(this.getModalityVal(currentTarget));
			return false;
		});
	}

	toggleOption(btn) {
		this.btnMain.removeClass('active');
		btn.addClass('active');
	}

	getModalityVal(btn) {
		const modality = btn.attr('data-modality');
		return modality;
	}

	setUrlModality(modality) {
		const url = window.location.href;
		const urlString = window.location.search;
		const urlPath = url.replace(urlString, '');

		let cleanedUrl = [];

		let queryParam = '';
		let queryParamKey = '';
		const newQueryParamArr = [];
		let newQueryParamString = '';

		const stateObj = { modality };
		let newUrl = '';

		if (urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = urlString.split(new RegExp(`[${delimiters}]`, 'g'));

			cleanedUrl = urlStringToArray.filter((val) => {
				return val !== '';
			});
		}


		// Si query String is not empty
		if (cleanedUrl.length !== 0) {
			for (let i = 0; i < cleanedUrl.length; i++) {
				queryParam = cleanedUrl[i].split('=');
				queryParamKey = queryParam[0];

				if (queryParamKey === this.keyModality) {
					queryParam[1] = modality;
					queryParam = `${queryParamKey}=${queryParam[1]}`;
				} else {
					queryParam = cleanedUrl[i];
				}
				newQueryParamArr.push(queryParam);
			}
		} else {
			queryParam = `${this.keyModality}=${modality}`;
			newQueryParamArr.push(queryParam);
		}

		if (newQueryParamArr.length > 1) {
			newQueryParamString = newQueryParamArr.join('&');
		} else {
			newQueryParamString = newQueryParamArr.toString();
		}

		newUrl = `${urlPath}?${newQueryParamString}`;
		this.history.pushState(stateObj, modality, newUrl);
	}
}
