
var testScriptHost = 'localhost:8000'; // change it to the site that hosts the scripts

var config = {
    webdriver: {
        server: {
            host: 'localhost',
            port: 4444,
            retries: 5,
            delay: 500
        },
        capabilities: {
            'browserName': 'firefox',
            'version': '',
            'platform': 'ANY',
            'javascriptEnabled': true
        }
    },
    testSiteUrl: 'http://www.jquery.com/',
    testScriptUrl: 'http://localhost:8000/'
};

module.exports = config;
