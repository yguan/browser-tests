var testScriptHost = 'http:\/\/localhost:8000\/';

var scriptInjection = {
    getScriptsToInject: function () {
        var cssInject = '$("head").append("<link rel=\'stylesheet\' href=\'{host}css\/mocha.css\'\/>");',
            jsInject = '$("body").append("<script src=\'{host}js\/test-scripts.js\'><\/script>");',
            setTestScriptUrl = 'window.testConfig={testScriptUrl: "{host}"};';
        return (cssInject + setTestScriptUrl + jsInject).replace(/{host}/g, testScriptHost);
    }
};
eval(scriptInjection.getScriptsToInject());