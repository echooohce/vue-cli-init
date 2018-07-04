export const setStore = (name, content) => {
    if (!name) return;
    typeof content !== "string" ? (content = JSON.stringify(content)) : "";
    window.localStorage.setItem(name, content);
};

export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
};

export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

export const getCookie = name => {
    var arr,
        reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr) {
        return arr[2];
    } else {
        return null;
    }
};

export const setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
        c_name +
        "=" +
        escape(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
};

export const removeCookie = name => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};