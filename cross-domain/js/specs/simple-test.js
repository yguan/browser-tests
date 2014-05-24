define(['lib/browser'],function (Browser) {
    var browser = Browser.getInstance();

    describe('fake site', function () {
        it('should modified result div html', function (done) {
            browser
                .openWindow('http://jquery.com/')
                .waitForElementExist('.searchform')
                .call(function (win, next) {
                    win.$('#menu-top .menu-item:eq(1) a')[0].click();
                    done();
                })
                .end();
        })
    });
});