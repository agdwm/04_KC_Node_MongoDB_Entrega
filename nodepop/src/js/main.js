window.$ = window.jQuery = require('jquery');

// SERVICES
import PaginateService from './services/paginateService';

// PRESENTATION
import LanguageManager from './presentation/languageManager';
import HeaderManager from './presentation/headerManager';
import SubHeaderManager from './presentation/subHeaderManager';
import FiltersManager from './presentation/filtersManager';
import AdsListManager from './presentation/adsListManager';

// Services
const paginateService = new PaginateService();
const languageManager = new LanguageManager();

// Presentation
const headerManager = new HeaderManager(languageManager);
const subHeaderManager = new SubHeaderManager();
const filtersManager = new FiltersManager();
const adsListManager = new AdsListManager('#ad-list', paginateService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
adsListManager.init();
