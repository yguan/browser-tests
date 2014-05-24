/*jslint nomen: true*/
/*global $,define,require,_ */

define([
    'exports',
    'lib/async-chain',
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

    function elementExist(selector, win) {
        if (win.$) {
            return win.$(selector).length > 0;
        }
        return false;
    }

    function Browser() {
        this.chain = asyncChain.create();
        this.popups = [];
        this._currentWindow;
    }

    Browser.prototype._getCurrentWindow = function () {
        return this._currentWindow;
    }
    Browser.prototype.openWindow = function (url) {
        var me = this;
        me.chain.add(function (next) {
            var win = window.open(url, 'win', windowFeatures);
            me.popups.push(win);
            me._currentWindow = win;
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
                return elementExist(selector, me._getCurrentWindow());
            }, next, timeoutMessage, timeoutInMilliseconds || timeoutInMs.elementExist)
        });

        return me;
    };
    Browser.prototype.call = function (fn) {
        var me = this;
        me.chain.add(function (next) {
            fn(me._getCurrentWindow(), next);
        });

        return me;
    };
    Browser.prototype.end = function () {
        this.chain.run();
    };

    exports.getInstance = function () {
        return new Browser();
    }
});