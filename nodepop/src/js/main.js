window.$ = window.jQuery = require('jquery');

// SERVICES
import AdsService from './services/AdsService';
import PaginateService from './services/PaginateService';

// PRESENTATION
import LanguageManager from './presentation/LanguageManager';
import HeaderManager from './presentation/HeaderManager';
import SubHeaderManager from './presentation/SubHeaderManager';
import FiltersManager from './presentation/FiltersManager';

// Services
const adsService = new AdsService();
const paginateService = new PaginateService();
const languageManager = new LanguageManager();

// Presentation
const headerManager = new HeaderManager(languageManager);
const subHeaderManager = new SubHeaderManager(adsService);
const filtersManager = new FiltersManager(adsService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
