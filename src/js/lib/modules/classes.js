import $ from '../core';

$.prototype.addClass = function (...className) {
    for (let i = 0; i < this.length; i++) {
        if (!this.classList) { continue; }
        this[i].classList.add(...className);
    }
    return this;
};

$.prototype.removeClass = function (...className) {
    for (let i = 0; i < this.length; i++) {
        if (!this.classList) { continue; }
        this[i].classList.remove(...className);
    }
    return this;
};

$.prototype.toggleClass = function (className) {
    for (let i = 0; i < this.length; i++) {
        this[i].classList.toggle(className);
    }
    return this;
};