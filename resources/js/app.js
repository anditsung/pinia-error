import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp, router, Head, Link } from "@inertiajs/vue3";
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { createPinia } from "pinia";
import { createPages } from "@/pages.js";
import { createAppStore } from "@/stores/app.js";
import { isNil } from "lodash";

window.createApp = () => new App()

class App {
    constructor() {
        this.pages = createPages()
    }

    boot() {
        this.store = createAppStore()
    }

    async countdown() {
        this.log('Initiating App countdown...')

        await createInertiaApp({
            title: title => `${title} - Laravel`,
            resolve: (name) => this.pages[name],
            setup: ({ el, App, props, plugin }) => {
                this.mountTo = el
                this.app = createApp({ render: () => h(App, props) })
                this.app.use(plugin)
                this.app.use(createPinia())
            }
        })
    }

    liftOff() {
        this.log('We have lift off!')

        this.boot()

        this.app.use(ZiggyVue)

        document.addEventListener('inertia:before', () => {
            ;(async () => {
                this.log('Syncing Inertia props to the store...')
                await this.store.assignPropsFromInertia()
            })()
        })

        document.addEventListener('inertia:navigate', () => {
            ;(async () => {
                this.log('Syncing Inertia props to the store...')
                await this.store.assignPropsFromInertia()
            })()
        })

        this.component('Link', Link)
        this.component('InertiaLink', Link)
        this.component('Head', Head)

        this.app.mount(this.mountTo)

        this.log('All systems go...')
    }

    component(name, component) {
        if (isNil(this.app._context.components[name])) {
            this.app.component(name, component)
        }
    }

    log(message, type = 'log') {
        console[type](`[APP]`, message)
    }
}
