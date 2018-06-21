'use strict';

const $ = require('jquery');

export default class DataService {

	constructor() {
		this.data = {};
	}

	getData() {
		return this.data;
	}

	setData(key, val) {
		if (key === 'isSale') {
			this.setDataModality(key, val);
		} else if (key === 'tags') {
			this.setFilters(key, val);
		}
	}

	setDataModality(key, val) {
		if ($.isEmptyObject(this.data) || this.data[key] !== val) {
			this.data[key] = val;
		} else if (Object.prototype.hasOwnProperty.call(this.data, key)) {
			if (this.data[key] !== val) {
				this.data[key] = val;
			}
		}
	}

	setFilters(key, val) {
		if ($.isEmptyObject(this.data)) {
			this.data[key] = [val];
		} else if (Object.prototype.hasOwnProperty.call(this.data, key)) {
			const index = this.data[key].indexOf(val);

			if (index >= 0) {
				this.data[key].splice(index, 1);
			} else {
				this.data[key].push(val);
			}
		} else {
			this.data[key] = [val];
		}
	}

}
