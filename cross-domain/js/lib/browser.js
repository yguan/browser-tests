/*jslint nomen: true*/
/*global $,define,require,_ */

define([
    'exports',
    'lib/async-cahin',
    'lib/wait'
], function (exports, asyncChain, wait) {
    'use strict';

    var windowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes',
        addEventListenerMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
        timeoutInMs = {
            elementExist: 5000
        };

    function waitFor(testFx, onReady, timeoutMessage, timeOutMillis) {
        wait.waitFor(testFx, onReady, function () {
            throw timeoutMessage;
        }, timeOutMillis)
    }

    function elementExist(selector) {
        return $(selector).length > 0;
    }

    function Browser() {
        this.chain = asyncChain.create();
        this.popups = [];
        this.currentWindow;
    }

    Browser.prototype.openWindow = function (url) {
        var me = this;
        me.chain.add(function (next) {
            var win = window.open(url, 'win', windowFeatures);
            me.popups.push(win);
            me.currentWindow = win;
            win[addEventListenerMethod]('load', function () {
                next();
            });
        });

        return me;
    };
    Browser.prototype.waitForElementExist = function (selector, timeoutInMilliseconds) {
        var me = this,
            timeoutMessage = 'waitForElementExist timeout for ' + selector;

        me.chain.add(function (next) {
            waitFor(function () {
                return elementExist(selector);
            }, next, timeoutMessage, timeoutInMilliseconds || timeoutInMs.elementExist)
        });

        return me;
    };
    Browser.prototype.call = function (fn) {
        this.add(function () {
            fn();
        });
    };
    Browser.prototype.end = function () {
        this.chain.run();
    };

    exports.getInstance = function () {
        return new Browser();
    }
});