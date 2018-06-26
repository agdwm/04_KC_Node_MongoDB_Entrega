'use strict';

const $ = require('jquery');

export default class PaginationManager {
	constructor(adsService, dataService) {
		this.adsService = adsService;
		this.dataService = dataService;

		this.adsContainter = $('#ad-list');
		this.pagContainer = $('#pagination');
		this.btnPagination = $('.paginationjs-pages li');
		this.infoTag = $('#pagination-info');

		this.currentBtn = 1; // Valor del boton sobre el que se ha pulsado
		this.skip = 1; // Valor de comienzo de cada array de 8 anuncios
		this.limit = 8; // items per page

		this.totalAds = parseInt(this.infoTag.attr('data-total'), 10); // total de anuncios q recibimo en cada petición
		this.dataSource = [];
		this.paginationKey = this.infoTag.attr('data-type');
		this.paginationVal = {};
	}

	init() {
		this.setupLoadEventHandler();
		this.setupClickEventHandler();
	}

	setupLoadEventHandler() {
		$(document).ready(() => {
			this.generateDataSource();
			this.paginate();
		});
	}

	setupClickEventHandler() {
		$('#pagination').on('click', '.paginationjs-pages li', (e) => {	
			e.preventDefault();
		});
	}

	// Valor con que comienza cada array de 8 anuncios
	getCurrentSkip() {
		this.skip = ((this.currentBtn * this.limit) - this.limit) + 1;
	}

	// Total de anuncios que nos traemos en cada petición una vez filtrada.
	getTotalAds() {
		return this.totalAds;
	}

	// preparamos el objeto con paginationVal con los atributos {'skip' y 'limit'}
	// y sus valores correspodientes, para pasárselo posteriormente al dataService que preparará
	// el objeto data que irá en la llamada "Ajax"
	generatePaginationVal() {
		this.paginationVal.skip = (this.skip).toString();
		this.paginationVal.limit = (this.limit).toString();
	}

	// Generamos un array "this.dataSource" a partir del total de elementos "this.totalAds"
	// que hemos recibido de la petición
	generateDataSource() {
		const result = [];

		for (let i = 1; i <= this.totalAds; i++) {
			result.push(i);
		}
		this.dataSource = result;
	}

	loadAds(data) {
		this.adsService.getList(
			data,
			(ads) => {
				if (ads) {
					this.renderAds(ads);
					this.switchPagination();
				}
			},
			(req, status, err) => {
				console.log('something went wrong', status, err);
			}
		);
	}

	paginate() {
		this.pagContainer.pagination({
			dataSource: this.dataSource, // total ads from filtered request
			pageSize: this.limit, // num max ads per page
			showGoInput: true,
			showGoButton: true,
			showBeginingOnOmit: false,
			showEndingOnOmit: false,
			pageRange: 1,
			// totalPage: 5,
			prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
			nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
			callback: (data, pagination) => {
				this.currentBtn = pagination.pageNumber;
				this.getCurrentSkip();
				this.generatePaginationVal();
				this.generateDataSource();
				this.dataService.setData(this.paginationKey, this.paginationVal);
				this.loadAds(this.dataService.getData());
			}
		});
	}

	renderAds(ads) {
		// console.log('renderAds', ads);
		this.adsContainter.html(ads);
	}
}
