window.$ = window.jQuery = require('jquery');

// SERVICES
import PaginateService from './services/paginateService';
import LanguageService from './services/languageService';

// MANAGERS
import HeaderManager from './services/headerManager';
import SubHeaderManager from './services/subHeaderManager';
import FiltersManager from './services/filtersManager';
import AdsListManager from './services/adsListManager';

// Services
const paginateService = new PaginateService();
const languageService = new LanguageService();

// Managers
const headerManager = new HeaderManager(languageService);
const subHeaderManager = new SubHeaderManager();
const filtersManager = new FiltersManager();
const adsListManager = new AdsListManager('#ad-list', paginateService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
adsListManager.init();
