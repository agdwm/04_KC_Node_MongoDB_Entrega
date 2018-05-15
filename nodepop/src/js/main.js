window.$ = window.jQuery = require('jquery');

import HeaderManager from './services/headerManager';
import SubHeaderManager from './services/subHeaderManager';
import FiltersManager from './services/filtersManager';
import PaginateService from './services/paginateService';
import AdsListManager from './services/adsListManager';


const headerManager = new HeaderManager();
const subHeaderManager = new SubHeaderManager();
const filtersManager = new FiltersManager();
const paginateService = new PaginateService();
const adsListManager = new AdsListManager("#ad-list", paginateService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
adsListManager.init();
