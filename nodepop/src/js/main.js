window.$ = window.jQuery = require('jquery');

import HeaderManager from './services/headerManager';
import SubHeaderManager from './services/subHeaderManager';
import FiltersManager from './services/filtersManager';

const headerManager = new HeaderManager();
const subHeaderManager = new SubHeaderManager();
const filtersManager = new FiltersManager();

headerManager.init();
subHeaderManager.init();
filtersManager.init();

