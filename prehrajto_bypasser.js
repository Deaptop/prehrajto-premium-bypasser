// ==UserScript==
// @name         Prehraj.to Premium Bypasser
// @description  Patches playtime limit and activity trackers
// @match        https://prehrajto.cz/*
// @version      0.2.0
// @run-at       document-start
// @author       Deaptop
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    // Patch playtime check

    Object.defineProperty(window, 'redirectLink', { // defining a new, unchangeable property
        configurable: true, // property can be later modified
        get() { // reassigning get function to always return null
            return null;
        },
        set(value) {} // overwrite set to do nothing
    });
    console.log('Playtime limit patched. A good start.')


    // Intercept tracking XHR requests

    // save the original functions
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    originalOpen.call;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {// intercept
        this.__blockVideoStarted = // bool value, was the specific XHR request started?
            //method.toUpperCase() === 'POST' && //does it use POST method
            ( String(url).includes('do=videoStarted') || String(url).includes('do=videoVisit') ); //does it contain blacklisted keys?

        return originalOpen.call(this, method, url, ...args); //call original function
    };

    XMLHttpRequest.prototype.send = function(body) {
        if (this.__blockVideoStarted) { // filter the wanted request
            console.log('Blocked a tracker request. Good for you.');
            return; // return without sending the request
        }

        return originalSend.call(this, body);// if passed, send the request
    };
})();