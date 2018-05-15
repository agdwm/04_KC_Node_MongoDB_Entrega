window.$ = window.jQuery = require('jquery');

import HeaderManager from './services/headerManager';
import FiltersManager from './services/filtersManager';

const headerManager = new HeaderManager();
const filtersManager = new FiltersManager();

headerManager.init();
filtersManager.init();
