window.$ = window.jQuery = require('jquery');

// SERVICES
import AdsService from './services/AdsService';
import DataService from './services/DataService';
import PaginateService from './services/PaginateService';

// PRESENTATION
import LanguageManager from './presentation/LanguageManager';
import HeaderManager from './presentation/HeaderManager';
import SubHeaderManager from './presentation/SubHeaderManager';
import FiltersManager from './presentation/FiltersManager';
import PriceManager from './presentation/PriceManager';
import SearchManager from './presentation/SearchManager';

// Services
const adsService = new AdsService();
const dataService = new DataService();
const paginateService = new PaginateService();
const languageManager = new LanguageManager();

// Presentation
const headerManager = new HeaderManager(languageManager);
const subHeaderManager = new SubHeaderManager(adsService, dataService);
const filtersManager = new FiltersManager(adsService, dataService);
const priceManager = new PriceManager(adsService, dataService);
const searchManager = new SearchManager(adsService, dataService);

headerManager.init();
subHeaderManager.init();
filtersManager.init();
priceManager.init();
searchManager.init();

