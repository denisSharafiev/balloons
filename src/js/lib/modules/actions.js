import $ from '../core';

// изменение и получение html элементов
$.prototype.html = function (content) {
    for (let i = 0; i < this.length; i++) {
        if (content) { this[i].innerHTML = content; }
        else { return this[i].innerHTML; }
    }
    return this;
};

// получение элемента по номеру (возвращ-ся объект)
$.prototype.eq = function (i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;
    for (let i = 0; i < objLength; i++) { delete this[i]; }
    this[0] = swap;
    this.length = 1;
    return this;
};

// получение эл-ов по порядку(один родитель) возвращает число, а не объект
// $('div').click(function() {
//     console.log($(this).index());
// });
$.prototype.index = function () {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item)=> {
        return item == this[0];
    };
    return childs.findIndex(findMyIndex);
};

// выбор опред-х эл-ов среди отобранных(сравнение и запись в новый объект, старый удал-ся)
// console.log($('div').eq(1).find('.more'));
$.prototype.find = function (selector) {
    //кол-во найденных эл-ов
    let numOfItems = 0,
        // кол-во записанных эл-ов
        counter = 0;
    // поверхностная копия главного объекта
    const copyObj = Object.assign({}, this);
    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].querySelectorAll(selector);
        if (arr.length == 0) { continue; }
        for (let j = 0; j < arr.length; j++) { this[counter] = arr[j]; counter++; }
        numOfItems += arr.length;
    }
    this.length = numOfItems;
    const objLength = Object.keys(this).length;
    // удаление свободных ячеек после отбора
    for (; numOfItems < objLength; numOfItems++) { delete this[numOfItems]; }
    return this;
};

// опред-ие ближайшего блока по заданному селектору(аналог нативного closest)
// console.log($('.hero').closest('.find1'));
$.prototype.closest = function (selector) {
    // кол-во найденных эл-ов
    let counter = 0;
    // нужно устранить баг с null  
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].closest(selector);
        counter++;
    }
    const objLength = Object.keys(this).length;
    for (; counter < objLength; counter++) {
        delete this[counter];
    }
    return this;
};

// получение всех соседних эл-ов кроме самого блока(поиск внутри родителя)
//console.log($('.hero').eq(1).siblings());
// console.log($('.find').siblings());
$.prototype.siblings = function () {
    //кол-во найденных эл-ов
    let numOfItems = 0,
        // кол-во записанных эл-ов
        counter = 0;
    // поверхностная копия главного объекта
    const copyObj = Object.assign({}, this);
    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;
        for (let j = 0; j < arr.length; j++) {
            if (copyObj[i] === arr[j]) { continue; }
            this[counter] = arr[j];
            counter++;
        }
        numOfItems += arr.length -1;
    }
    this.length = numOfItems;
    const objLength = Object.keys(this).length;
    // удаление свободных ячеек после отбора
    for (; numOfItems < objLength; numOfItems++) { delete this[numOfItems]; }
    return this;
};