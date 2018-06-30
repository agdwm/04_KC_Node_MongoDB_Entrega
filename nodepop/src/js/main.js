// SERVICES
import AdsService from './services/AdsService';
import DataService from './services/DataService';
import PaginateService from './services/PaginateService';

// PRESENTATION

import LanguageManager from './presentation/LanguageManager';
import PaginationManager from './presentation/PaginationManager';
import CommonManager from './presentation/CommonManager';
import HeaderManager from './presentation/HeaderManager';
import SubHeaderManager from './presentation/SubHeaderManager';
import FiltersManager from './presentation/FiltersManager';
import PriceManager from './presentation/PriceManager';
import SearchManager from './presentation/SearchManager';

// Dependences
const $ = require('jquery');
window.$ = window.jQuery = require('jquery');
require('paginationjs');

// Services
const adsService = new AdsService();
const dataService = new DataService();

const paginateService = new PaginateService();
const languageManager = new LanguageManager();

// Presentation
const commonManager = new CommonManager(adsService, paginateService);
const headerManager = new HeaderManager(languageManager);
const subHeaderManager = new SubHeaderManager(dataService, commonManager);
const filtersManager = new FiltersManager(dataService, commonManager);
const priceManager = new PriceManager(dataService, commonManager);
const searchManager = new SearchManager(dataService, commonManager);

const paginationManager = new PaginationManager(dataService, paginateService, commonManager);


// on load
$(document).ready(() => {
	headerManager.init();
	commonManager.init();

	subHeaderManager.init();
	filtersManager.init();
	priceManager.init();
	searchManager.init();
	paginationManager.init();
});
