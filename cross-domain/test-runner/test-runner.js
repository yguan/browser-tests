var runnerConfig = require('./runner-config'),
    scriptInjector = require('./script-injector'),
    wd = require('wd'),
    connect = require('connect'),
    http = require('http');


function startTestScriptServer(config) {
    var app = connect()
        .use(connect.static(config.testScriptServer.appDir))
        .use(connect.directory(config.testScriptServer.appDir));

    http.createServer(app)
        .listen(config.testScriptServer.port)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:' + config.testScriptServer.port + '.');
            runTests(config);
        });
}

function startSeleniumServer() {
    var selenium = require('selenium-standalone'),
        spawnOptions = { stdio: 'pipe' },
        seleniumArgs = [ // options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
//            '-debug'
        ],
        server = selenium(spawnOptions, seleniumArgs);
}

function runTests(config) {
    var browser = wd.promiseChainRemote();
    browser
        .init(config.webdriver.capabilities)
        .get(config.runExtjsTests ? config.extjsSiteUrl : config.jquerySiteUrl)
        .safeExecute('window.runExtjsTests=' + config.runExtjsTests)
        .safeExecute(scriptInjector.getScript(config.testScriptServer.url), function (err, res) {
        })
        .fin(function () {
            //browser.quit(); // todo: get the test results back and close the browser
        }).done();
}

startSeleniumServer();
startTestScriptServer(runnerConfig);