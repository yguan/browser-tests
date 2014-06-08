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
            elementExist: 10000
        };

    function waitFor(testFx, onReady, timeoutMessage, timeOutMillis) {
        wait.waitFor(testFx, onReady, function () {
            throw timeoutMessage;
        }, timeOutMillis)
    }

    /*
     * Change this function to have use different query
     */
    function selectElement(selector, win) {
        if (win.$) {
            return win.$(selector);
        }
        if (win.Ext) {
            return win.Ext.get(selector);
        }
        return null;
    }

    function elementExist(selector, win) {
        var element = selectElement(selector, win);
        if (element) {
            return true;
        }
        return false;
    }

    function Browser() {
        this.chain = asyncChain.create();
        this.currentWindow;
    }

    Browser.prototype = {
        getCurrentWindow: function () {
            return this.currentWindow;
        },
        openWindow: function (url) {
            var me = this;
            me.chain.add(function (next) {
                var win = window.open(url, 'win', windowFeatures);
                me.currentWindow = win;
                win[addEventListenerMethod]('load', function () {
                    next();
                });
            });

            return me;
        },
        waitFor: function (testFn, timeoutInMilliseconds) {
            var me = this,
                timeoutMessage = 'waitFor condition timeout';

            me.chain.add(function (next) {
                waitFor(function () {
                    return testFn(me.getCurrentWindow());
                }, next, timeoutMessage, timeoutInMilliseconds || timeoutInMs.elementExist)
            });

            return me;
        },
        waitForElementExist: function (selector, timeoutInMilliseconds) {
            var me = this,
                timeoutMessage = 'waitForElementExist timeout for ' + selector;

            me.chain.add(function (next) {
                waitFor(function () {
                    return elementExist(selector, me.getCurrentWindow());
                }, next, timeoutMessage, timeoutInMilliseconds || timeoutInMs.elementExist);
            });

            return me;
        },
        selectElement: function (selector, onElementFound) {
            var me = this,
                timeoutMessage = 'waitForElementExist timeout for ' + selector;

            me.chain.add(function (next) {
                waitFor(function () {
                    return elementExist(selector, me.getCurrentWindow());
                }, function () {
                    onElementFound(selectElement(selector, me.getCurrentWindow()));
                    if (next) {
                        next();
                    }
                }, timeoutMessage, timeoutInMs.elementExist);
            });

            return me;
        },
        execute: function (fn) {
            var me = this;
            me.chain.add(function (next) {
                fn(me.getCurrentWindow(), next);
            });

            return me;
        },
        end: function () {
            this.chain.run();
        }
    };

    exports.getInstance = function () {
        return new Browser();
    }
});