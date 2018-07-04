import Vue from "vue";
import Vuex from "vuex";
import home from "./home";
import echohawa from "./echohawa";
import hawa from "./hawa";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        home,
        echohawa,
        hawa
    }
});

export default store;