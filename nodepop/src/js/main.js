window.$ = window.jQuery = require('jquery');

// SERVICES
import PaginateService from './services/paginateService';
import LanguageService from './services/languageService';

// PRESENTATION
import HeaderManager from './presentation/headerManager';
import SubHeaderManager from './presentation/subHeaderManager';
import FiltersManager from './presentation/filtersManager';
import AdsListManager from './presentation/adsListManager';

// Services
const paginateService = new PaginateService();
const languageService = new LanguageService();

// Presentation
const headerManager = new HeaderManager(languageService);
const subHeaderManager = new SubHeaderManager();
const filtersManager = new FiltersManager();
const adsListManager = new AdsListManager('#ad-list', paginateService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
adsListManager.init();
