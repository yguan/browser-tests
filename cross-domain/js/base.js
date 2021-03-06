
(function () {
    // https://github.com/jrburke/requirejs/wiki/Fine-grained-URL-control
    var load = requirejs.load;
    requirejs.load = function (context, moduleId, url) {
        //modify url here, then call original load
        var relativeUrl = url.indexOf('./') === 0 ? url.substring(1) : url,
            urlWithScheme = window.testScriptUrl + relativeUrl;

        return load(context, moduleId, urlWithScheme);
    };

    //Now load code.
    require(['js/requirejs-config', 'js/lib/jquery', 'js/lib/mocha'], function () {
        $('body').append('<div id="mocha" style="z-index:10000; background-color:white;width:100%;height:100%;position: absolute;top:0;margin: 0;"></div>');
        window.mocha.ui('bdd');
        window.mocha.reporter('html');
        require(['specs/all'], function () {
            window.mocha.run();
        });
    });
}());

