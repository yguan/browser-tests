
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
    testSiteUrl: 'http://www.jquery.com/'
};

module.exports = config;
