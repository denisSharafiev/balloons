import $ from '../core';

$.prototype.addAttr = function (attrName, attrValue) {
    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(attrName, attrValue);
    }
    return this;
};

$.prototype.removeAttr = function (...attrName) {
    for (let i = 0; i < this.length; i++) {
        if (!attrName) { return this; }
        this[i].removeAttribute(...attrName);
    }
    return this;
};

$.prototype.toggleAttr = function (attrName, attrValue) {
    for (let i = 0; i < this.length; i++) {
        if (!attrName) { this[i].setAttribute(attrName, attrValue); }z
        if (attrName) { this[i].removeAttribute(attrName); }
    }
    return this;
};