import Vue from "vue";
import Router from "vue-router";
import home from "@/components/Home";

Vue.use(Router);

const _import = require("./_import_" + process.env.NODE_ENV);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "HelloWorld",
            component: _import("HelloWorld"),
            beforeEnter: (to, from, next) => {
                document.title = "动态的改变title|echohawa";
                next();
            }
        },
        {
            path: "/garden",
            name: "garden",
            component: _import("garden/Garden"),
            beforeEnter: (to, from, next) => {
                document.title = "尽情的去改吧-echohawa";
                next();
            },
            children: [{
                    path: "personalInfo",
                    name: "personalInfo",
                    component: _import("garden/PersonalInfo")
                },
                {
                    path: "mailbox",
                    name: "mailbox",
                    component: _import("garden/Mailbox")
                }
            ]
        },
        {
            path: "",
            redirect: "home"
        },
        {
            path: "*",
            name: "Notfound",
            component: _import("Notfound")
        }
    ]
});