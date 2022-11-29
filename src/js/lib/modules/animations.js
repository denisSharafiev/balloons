import $ from '../core';


$.prototype.animateOverTime = function (duration, callbackFunc, finalyFunc) {
    let timeStart;
    // технич. функция(первич. уст-ка времен. промеж.)
    function _animateOverTime(time) {
        if (!timeStart) { timeStart = time; }

        // выч. сколько времени прошло
        let timeElapsed = time - timeStart;
        // перемен., отвеч-ая за изменение параметров на странице(исполь-ся opacity, поэтому если timeElapsed / duration > 1, то ставим 1)
        let complection = Math.min(timeElapsed / duration, 1);
        // изменение opacity
        callbackFunc(complection);

        // если анимация закончилась
        if (timeElapsed < duration) { requestAnimationFrame(_animateOverTime); }
        else { if (typeof finalyFunc === 'function') { finalyFunc(); } }
    }
    return _animateOverTime;
};

$.prototype.fadeIn = function (duration, display, finalyFunc) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block';
        // функ-я принимает complection для измен. opacity, обязательно стрелоч. функц., т.к. нужен контект вызова(объект из цикла)
        const _fadeIn = (complection) => {
            this[i].style.opacity = complection;
        };
        // аргументы: скорость воспроизведения(обязат.); функц., которая запуск-ся после запуска анимации; необяз. колбэк 
        const ani = this.animateOverTime(duration, _fadeIn, finalyFunc);
        // воспроиз-ие анимации
        requestAnimationFrame(ani);
    }

    return this;
};


$.prototype.fadeOut = function (duration, finalyFunc) {
    for (let i = 0; i < this.length; i++) {
        // функ-я принимает complection для измен. opacity, обязательно стрелоч. функц., т.к. нужен контект вызова(объект из цикла)
        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection;
            if (complection === 1) { this[i].style.display = 'none'; }
        };
        // аргументы: скорость воспроизведения(обязат.); функц., которая запуск-ся после запуска анимации; необяз. колбэк 
        const ani = this.animateOverTime(duration, _fadeOut, finalyFunc);
        // воспроиз-ие анимации
        requestAnimationFrame(ani);
    }

    return this;
};

// переключение анимации
$.prototype.fadeToggle = function (duration, display, finalyFunc) {
    for (let i = 0; i < this.length; i++) {
        // если эл. скрыт
        if (window.getComputedStyle(this[i]).display === 'none') {
            this[i].style.display = display || 'block';
            // функ-я принимает complection для измен. opacity, обязательно стрелоч. функц., т.к. нужен контект вызова(объект из цикла)
            const _fadeIn = (complection) => {
                this[i].style.opacity = complection;
            };
            // аргументы: скорость воспроизведения(обязат.); функц., которая запуск-ся после запуска анимации; необяз. колбэк 
            const ani = this.animateOverTime(duration, _fadeIn, finalyFunc);
            // воспроиз-ие анимации
            requestAnimationFrame(ani);
        } else {
            // функ-я принимает complection для измен. opacity, обязательно стрелоч. функц., т.к. нужен контект вызова(объект из цикла)
            const _fadeOut = (complection) => {
                this[i].style.opacity = 1 - complection;
                if (complection === 1) { this[i].style.display = 'none'; }
            };
            // аргументы: скорость воспроизведения(обязат.); функц., которая запуск-ся после запуска анимации; необяз. колбэк 
            const ani = this.animateOverTime(duration, _fadeOut, finalyFunc);
            // воспроиз-ие анимации
            requestAnimationFrame(ani);
            }
    }
    return this;
};