// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueMatomo from "vue-matomo";
import VueI18n from "vue-i18n";
import LangEn from "../static/lang/en";
import LangCn from "../static/lang/cn";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import ComponnetRegister from "./components/componentRegister";

Vue.config.productionTip = false;

// Vue.use(VueMatomo, {
//     host: "",
//     siteId: 1,
//     router: router,
//     requireConsent: true
// });

Vue.use(VueI18n);

Vue.use(VueAwesomeSwiper);

import { setStore, getStore, removeStore, getCookie } from "./utils/storage.js";

// router.beforeEach((to, from, next) => {});

const i18n = new VueI18n({
    locale: "cn",
    messages: {
        en: LangEn,
        cn: LangCn
    }
});

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    i18n,
    components: { App },
    template: "<App/>"
});