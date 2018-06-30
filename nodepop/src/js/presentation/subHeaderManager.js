'use strict';

const $ = require('jquery');

export default class SubHeaderManager {

	constructor(dataService, commonManager) {

		this.dataService = dataService;
		this.commonManager = commonManager;

		this.btnMain = $('.main_button');

		this.modalityKey = '';
		this.modalityVal = '';

		this.initSkip = 0;
		this.currentBtn = 1;
		this.object = [];
	}

	init() {
		this.setupClickEventHandler();
	}

	setupClickEventHandler() {
		this.btnMain.on('click', (e) => {
			const self = this;
			const currentTarget = $(e.currentTarget);

			this.switchOption(currentTarget);
			this.getModalityKey(currentTarget);
			this.getModalityVal(currentTarget);

			this.dataService.createData({ isSale: this.modalityVal, skip: this.initSkip, limit: 8 });
			this.commonManager.loadAdsMain(self, this.dataService.getData());

			return false;
		});
	}

	getCurrentBtn(btn) {
		const currentBtn = $.trim(btn.attr('data-num'));
		this.currentBtn = currentBtn;
	}

	switchOption(btn) {
		this.btnMain.removeClass('active');
		btn.addClass('active');
	}

	getModalityKey(btn) {
		this.modalityKey = btn.attr('data-type');
	}

	getModalityVal(btn) {
		this.modalityVal = btn.attr('data-value');
	}

	generateData(paginationTotalKey, paginationTotalVal) {
		this.dataService.setData(paginationTotalKey, paginationTotalVal);
	}
}
