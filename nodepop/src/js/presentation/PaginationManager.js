'use strict';

const $ = require('jquery');

export default class PaginationManager {
	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;

		this.adsContainter = $('#ad-list');
		this.pagContainer = $('#pagination');
		this.btnPagination = $('.paginationjs-pages li');
		this.totalTag = $('#pagination-total');
		this.limitTag = $('#pagination-limit');

		this.currentBtn = 1; // Valor del boton sobre el que se ha pulsado
		this.skip = 1; // Valor de comienzo de cada array de 8 anuncios
		this.limit = parseInt($.trim(this.limitTag.attr('data-limit')), 10); // items per page

		this.totalAds = parseInt($.trim(this.totalTag.attr('data-total')), 10); // total de anuncios q recibimo en cada petición
		this.dataSource = [];
		this.paginationTotalKey = $.trim(this.totalTag.attr('data-type'));
		this.paginationTotalVal = {};
	}

	init() {
		this.setupLoadEventHandler();
		this.setupClickEventHandler();
	}

	setupLoadEventHandler() {
		$(document).ready(() => {
			if (this.dataSource.length < 1) {
				this.generateDataSource();
			}
			// this.generateCurrentSkip();
			this.paginate(this.dataSource);
		});
	}

	setupClickEventHandler() {
		$('#pagination').on('click', '.paginationjs-pages li', (e) => {	
			e.preventDefault();
		});
	}

	// ARRAY Total de elementos -> dataSource
	generateDataSource() { // OK
		const result = [];

		for (let i = 1; i <= this.totalAds; i++) {
			result.push(i);
		}
		this.dataSource = result;
	}

	// Valor con que comienza cada array de 8 anuncios
	generateCurrentSkip() {
		const currentSkip = ((this.currentBtn * this.limit) - this.limit) + 1;
		this.skip = currentSkip;
		console.log('page', this.currentBtn);
		console.log('maxItems', this.limit);
		console.log('currentSkip', currentSkip);
	}

	// Total de anuncios que nos traemos en cada petición una vez filtrada.
	getLimit() {
		return this.limit;
	}

	getTotalAds() {
		return this.totalAds;
	}

	// preparamos el objeto con paginationTotalVal con los atributos {'skip' y 'limit'}
	// y sus valores correspodientes, para pasárselo posteriormente al dataService que preparará
	// el objeto data que irá en la llamada "Ajax"
	generatepaginationTotalVal() {
		this.paginationTotalVal.skip = (this.skip).toString();
		this.paginationTotalVal.limit = (this.limit).toString();
	}

	loadAds(data) {
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
				}
			},
			(req, status, err) => {
				console.log('something went wrong', status, err);
			}
		);
	}

	paginate(dataSource) {
		this.pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: true,
			showGoButton: true,
			showBeginingOnOmit: false,
			showEndingOnOmit: false,
			pageRange: 1,
			// totalPage: 2,
			prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
			nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
			callback: (data, pagination) => {
				console.log('dataSource1', this.dataSource);
				this.currentBtn = pagination.pageNumber;
				this.generateCurrentSkip();
				this.generatepaginationTotalVal();
				this.dataService.setData(this.paginationTotalKey, this.paginationTotalVal);
				this.loadAds(this.dataService.getData());
			}
		});
	}

	renderAds(ads) {
		// console.log('renderAds', ads);
		this.adsContainter.html(ads);
	}
}
