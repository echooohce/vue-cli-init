import axios from "axios";
import _ from "lodash";
import Qs from "qs";
import config from "./http-config";
import store from "./../Store";
import {
    setStore,
    getStore,
    removeStore,
    getCookie,
    removeCookie,
    setCookie
} from "./../utils/storage.js";

const client = axios.create(config);

function requestConfig(ver, header = {}) {
    var clientConfig = {
        transformResponse: [
            function(data) {
                process.env.NODE_ENV === "dev" &&
                    console.log("返回数据：", JSON.parse(data));
                return JSON.parse(data);
            }
        ],
        headers: {
            Accept: `application/vnd.echohawa.v${ver}+json`
        },
        withCredentials: true
    };
    if (!_.isEmpty(headers)) {
        clientConfig.headers = Object.assign(clientConfig.headers, headers);
    }
    return clientConfig;
}

export default class Http {
    static get(uri, params = {}, version = "1.0") {
        uri += _isEmpty(params) ? "" : "?" + Qs.stringify(params);
        let _self = this;
        return client.get(uri, requestConfig(version)).then(response => {
            return _self.checkCode(response, uri);
        });
    }

    static post(uri, params = {}, version = "1.0") {
        return client
            .post(
                uri,
                Qs.stringify(params),
                requestConfig(version, {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                })
            )
            .then(this.checkCode);
    }

    static checkCode(response, uri) {
        let whiteList = /self|cardLogs|dailyTask|marqueeLogs|cardDetail|caiDetail/i;
        let checkLogin = true;
        typeof uri !== "undefined" && uri.search(whiteList) !== -1 ?
            (checkLogin = false) :
            "";
        var code = response.data.code;
        let datas = response,
            phonenum,
            phoneText;
        let updateList = /login|recharge|exchangeProduct|giveProduct|updateAvatar|updateNickname|checkIn|getCheckInReward/i;
        if (
            typeof uri !== "undefined" &&
            uri.search(updateList) !== -1 &&
            code === 0
        ) {
            store.dispatch("userInfo");
        }
        let _this = this;
        if (code != 0) {
            switch (code) {
                case 41000: //参数验证错误
                    break;
                case 41001: //业务逻辑错误
                    break;
                case 41002: //登录超时
                    break;
                case -1: //未登录
                    break;
                case 404: //路由错误
                    break;
                case 403: //无权操作
                    break;
                case -200:
                    break;
                case 41005:
                    break;
            }
        }
        return response;
    }

    static onError(error) {
        console.error(error);
    }
}