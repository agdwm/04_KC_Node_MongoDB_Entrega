const $ = require('jquery');

export default class HeaderManager {
	constructor(elementSelector, paginateService) {
		super(elementSelector);
		this.adsListView = $(elementSelector);
		this.paginateService = paginateService;
	}

	init() {
		if(this.adsListView > 0){

		}
	}

}

