/*jslint nomen: true*/
/*global $,define,require,_ */

define(['exports'], function (exports) {
    'use strict';

    function AsyncCahin() {
        this.methods = [];
    }

    AsyncCahin.prototype.add = function (fn) {
        this.methods.push(fn);
    };
    AsyncCahin.prototype.run = function () {
        var me = this,
            len = me.methods.length,
            i = len - 1;

        while (i > -1) {
            if (i === 0) {
                me.methods[i]();
                return;
            }

            // i > 0
            me.methods[i].call(this, me.methods[i - 1]);
        }

        this.methods = []; // clear methods
    };

    exports.create = function () {
        return new AsyncCahin();
    };
});