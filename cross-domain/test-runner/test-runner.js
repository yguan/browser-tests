var runnerConfig = require('./runner-config'),
    scriptInjector = require('./script-injector'),
    wd = require('wd'),
    connect = require('connect'),
    http = require('http');


function createTestScriptServer(config) {
    var app = connect()
        .use(connect.static(config.testScriptServer.appDir));

    http.createServer(app)
        .listen(config.testScriptServer.port)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:' + config.testScriptServer.port + '.');
            runTests(config);
        });
}

function startSeleniumServer() {
    var selenium = require('selenium-standalone');

    var spawnOptions = { stdio: 'pipe' };

// options to pass to `java -jar selenium-server-standalone-X.XX.X.jar`
    var seleniumArgs = [
        '-debug'
    ];

    var server = selenium(spawnOptions, seleniumArgs);
// or, var server = selenium();
// returns ChildProcess instance
// http://nodejs.org/api/child_process.html#child_process_class_childprocess

// spawnOptions defaults to `{ stdio: 'pipe' }`
// seleniumArgs defaults to `[]`

//    server.stdout.on('data', function(output) {
//        console.log(output);
//    });
}

function runTests(config) {
    var browser = wd.promiseChainRemote();

    // optional extra logging
    browser.on('status', function(info) {
        console.log(info.cyan);
    });
    browser.on('command', function(eventType, command, response) {
        console.log(' > ' + eventType.cyan, command, (response || '').grey);
    });
    browser.on('http', function(meth, path, data) {
        console.log(' > ' + meth.magenta, path, (data || '').grey);
    });

    browser
        .init({browserName:'chrome'})
        .get(config.testSiteUrl)
        .execute(scriptInjector.getScript(config.testScriptUrl))
        .fin(function () {
            //browser.quit(); // todo: get the test results back and close the browser
        }).done();
}

startSeleniumServer();
createTestScriptServer(runnerConfig);