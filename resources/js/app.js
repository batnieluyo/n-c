require('./bootstrap');

// Import modules...
import { createApp } from 'vue';
import { createWebHistory, createRouter } from "vue-router";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const el = document.getElementById('app');

const NotFoundComponent = { template: '<p>Page not found</p>' }
const HomeComponent = require(`./Pages/Home`).default
const ShippingCreate = require(`./Pages/Shipping/Create`).default
const ShippingEdit = require(`./Pages/Shipping/Edit`).default

const routes = [
    {
        name: 'home',
        path: '/',
        component: HomeComponent,
    },
    {
        name: 'shipping.create',
        path: '/shipping/create',
        component: ShippingCreate,
    },
    {
        name: 'shipping.show',
        path: '/shipping/:id',
        component: ShippingEdit,
    },
    {
        name: 'not_found',
        path: '/*',
        component: NotFoundComponent,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

import App from './Layouts/Layout'

createApp(App)
    .use(router)
    .use(VueSweetalert2)
    .mount(el);
