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
		switch (key) {
		case 'isSale':
			this.setDataModality(key, val);
			break;
		case 'tags':
			this.setFilters(key, val);
			break;
		case 'price':
			this.setPrice(key, val);
			break;
		case 'title':
			this.setTitle(key, val);
			break;
		case 'paginationTotal':
			this.setPagination(key, val);
			break;
		default:
			console.log(key, val);
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

	setPrice(key, val) {
		if ($.isEmptyObject(this.data) || this.data[key] !== val) {
			this.data[key] = val;
		} else if (Object.prototype.hasOwnProperty.call(this.data, key)) {
			if (this.data[key] !== val) {
				this.data[key] = val;
			}
		}
	}

	setTitle(key, val) {
		if ($.isEmptyObject(this.data) || this.data[key] !== val) {
			this.data[key] = [val];
		} else if (Object.prototype.hasOwnProperty.call(this.data, key)) {
			if (this.data[key] !== val) {
				this.data[key] = val;
			}
		}
	}

	setPagination(key, val) {
		const { skip, limit } = val;

		// if (skip === undefined) {
		// 	skip = 1;
		// }
		// if (limit === undefined) {
		// 	limit = 8;
		// }


		if ($.isEmptyObject(this.data) || this.data[key] !== val) {
			this.data.skip = skip;
			this.data.limit = limit;
		} else if (Object.prototype.hasOwnProperty.call(this.data, 'skip')) {
			if (this.data.skip !== skip) {
				this.data.skip = skip;
			}
		} else if (Object.prototype.hasOwnProperty.call(this.data, 'limit')) {
			if (this.data.limit !== limit) {
				this.data.limit = limit;
			}
		}
	}
}
