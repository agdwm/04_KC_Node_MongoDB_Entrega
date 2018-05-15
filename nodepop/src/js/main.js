window.$ = window.jQuery = require('jquery');

import HeaderManager from './services/headerManager';

const headerManager = new HeaderManager();
headerManager.init();
