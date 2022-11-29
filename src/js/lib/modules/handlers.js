import $ from '../core';
// обработчик событий
$.prototype.on = function (eventName, callback) {
    if(!eventName || !callback) {return this;}
    for (let i = 0; i < this.length; i++) {
        this[i].addEventListener(eventName, callback);
    }
    return this;
};

$.prototype.off = function (eventName, callback) {
    if(!eventName || !callback) {return this;}
    for (let i = 0; i < this.length; i++) {
        this[i].removeEventListener(eventName, callback);
    }
    return this;
};
// метод click
$.prototype.click = function (handler) {
    for (let i = 0; i < this.length; i++) {
        if(handler){this[i].addEventListener('click', handler);}
        else { this[i].click(); }     // виртуальный клик
    }
    return this;
};
