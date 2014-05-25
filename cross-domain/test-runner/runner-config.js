
var config = {
    webdriver: {
        capabilities: {
            browserName: 'chrome'
        }
    },
    testScriptServer: {
        port: 9000,
        url: 'http://localhost:9000/',
        appDir: 'C:\\Users\\coding\\Documents\\GitHub\\browser-tests\\cross-domain\\'
    },
    jquerySiteUrl: 'http://www.jquery.com/',
    extjsSiteUrl: 'http://docs.sencha.com/extjs/4.2.2/',
    runExtjsTests: false
};

module.exports = config;
