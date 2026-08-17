// ==UserScript==
// @name         Prehraj.to Premium Bypasser
// @description  Interferes play time check by overwriting redirect link parameter.
// @match        https://prehrajto.cz/*
// @version      0.1.0
// @run-at       document-start
// @author       Deaptop
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    Object.defineProperty(window, 'redirectLink', {
        configurable: true,
        get() {
            return null;
        },
        set(value) {}
    });
})();