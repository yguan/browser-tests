/*jslint nomen: true*/
/*global document */

// loadFile is based on the code from the following articles:
// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/

var injectScript = function injectScript(testScriptUrl) {

    function loadFile(fileRef, callback) {
        if (fileRef.readyState) {  //IE
            fileRef.onreadystatechange = function () {
                if (callback && (fileRef.readyState === 'loaded' || fileRef.readyState === 'complete')) {
                    fileRef.onreadystatechange = null;
                    callback();
                }
            };
        } else if (callback) {  //Others
            fileRef.onload = function () {
                callback();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(fileRef);
    }

    function loadJs(url, callback) {
        var fileRef = document.createElement('script');
        fileRef.setAttribute('type', 'text/javascript');
        fileRef.setAttribute('src', url);
        loadFile(fileRef, callback);
    }

    function loadCss(url, callback) {
        var fileRef = document.createElement('link');
        fileRef.setAttribute('rel', 'stylesheet');
        fileRef.setAttribute('type', 'text/css');
        fileRef.setAttribute('href', url);
        loadFile(fileRef, callback);
    }

    window.testScriptUrl = testScriptUrl;

    loadCss(testScriptUrl + 'css/mocha.css');

    loadJs(testScriptUrl + 'js/lib/require.js', function () {
        loadJs(testScriptUrl + 'js/base.js');
    });
};

// to run in the browser directly, uncomment the lines below
// window.runExtjsTests = true;
// injectScript('http://localhost:9000/');

module.exports = {
    getScript: function (testScriptUrl) {
        return injectScript.toString() + ';injectScript("' + testScriptUrl + '");';
    }
};