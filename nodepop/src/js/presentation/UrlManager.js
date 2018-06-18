'use strict';

const $ = require('jquery');

export default class UrlManager {

	constructor() {
		this.url = window.location.href;
		this.urlString = window.location.search;
		this.history = window.history;
		this.urlPath = this.url.replace(this.urlString, '');
		this.keyModality = 'isSale';
		// this.possibleModalities = ['true', 'false'];
		this.possibleTags = ['work', 'lifestyle', 'motor', 'mobile'];
	}

	setUrlModality(modality) {

		let cleanedUrl = [];
		let queryParam = '';
		let queryParamKey = '';
		const newQueryParamArr = [];
		let newQueryParamString = '';

		const stateObj = { modality };
		let newUrl = '';

		if (this.urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = this.urlString.split(new RegExp(`[${delimiters}]`, 'g'));

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

		newUrl = `${this.urlPath}?${newQueryParamString}`;
		this.history.pushState(stateObj, modality, newUrl);
	}

	setUrlFilter(filter) {
		let cleanedUrl = [];
		const newQueryParamArr = [];
		let newQueryParamString = '';

		const stateObj = { filter };
		let newUrl = '';

		console.log(filter);

		if (this.urlString !== '') {
			const delimiters = ['?', '&'];
			const urlStringToArray = this.urlString.split(new RegExp(`[${delimiters}]`, 'g'));
			// console.log('urlStringToArray', urlStringToArray);

			cleanedUrl = urlStringToArray.filter((val) => {
				return val !== '';
			});
			// console.log('cleanedUrl', cleanedUrl);
		}

		if (cleanedUrl.length !== 0) {
			const tagsArray = [];
			let queryParam = '';
			let position;
			const positionArray = [];
			let newQueryParam = '';
			let queryParamKey = '';
			let queryParamVal = '';
			let newTagsString = '';
			
			console.log('cleanedUrl', cleanedUrl);

			for (let i = 0; i < cleanedUrl.length; i++) {
				queryParam = cleanedUrl[i].split('=');
				queryParamKey = queryParam[0];
				queryParamVal = queryParam[1];

				if (queryParamKey === 'tags') {
					console.log('filter', filter);

					if (queryParamVal === filter) {
						positionArray.push(i);
					} else {
						newQueryParam = `${queryParamKey}=${filter}`;
						tagsArray.push(newQueryParam);
						console.log('newQueryParam', newQueryParam);
					}
				} else if (this.possibleTags.includes(filter)) {
					newQueryParam = `tags=${filter}`;
					tagsArray.push(newQueryParam);
				}
			}

			console.log('tagsArray', tagsArray);

			if (tagsArray.length > 1) {
				newTagsString = tagsArray.join('&');
			} else {
				newTagsString = tagsArray.toString();
			}

			if (this.urlString !== '') {
				newQueryParamString = `${this.urlString}&${newTagsString}`;
			}

			console.log('position', position);

			if (positionArray.length >= 1) {
				for (let i = 0; i < positionArray.length; i++) {
					cleanedUrl.splice(positionArray[i], 1);
				}
			} else {
				cleanedUrl.push(newTagsString);
			}

			console.log('cleanedUrl', cleanedUrl);
			console.log('this.urlPath', this.urlPath);
			newUrl = `${this.urlPath}${newQueryParamString}`;
			console.log('newUrl', newUrl);
			this.history.pushState(stateObj, filter, newUrl);
		}
	}
}
