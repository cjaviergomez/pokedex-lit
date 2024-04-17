import { Router } from '@vaadin/router';

import './src/components/pokemon-detail.js';
import './src/components/pokemon-filter.js';
import './src/components/pokemon-navbar.js';


const routes = [
    { path: '/', component: 'pokemon-filter' },
    { path: '/pokemon-filter', component: 'pokemon-filter' },
    { path: '/pokemon-detail', component: 'pokemon-detail' },
    { path: '/pokemon-detail/:id', component: 'pokemon-detail' }
];

export const router = new Router(document.querySelector('main'));
router.setRoutes(routes);



