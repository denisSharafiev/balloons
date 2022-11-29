const $ = function (selector) {
    return new $.prototype.init(selector);
};

$.prototype.init = function (selector) {
    if (!selector) { return this; }  // возвращ. пустой объект
    if (selector.tagName) { this[0] = selector; this.length = 1; return this; }         // если селектор - тэг
    // позвол. добавить в объект. св-ва
    Object.assign(this, document.querySelectorAll(selector));
    this.length = document.querySelectorAll(selector).length;
    return this;
};

// в прототип объекта, возвращ-ый из init пропис-ся прототип главной функц.
$.prototype.init.prototype = $.prototype;
window.$ = $;

export default $;


