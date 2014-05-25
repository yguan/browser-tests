define(['lib/browser'], function (Browser) {
    var browser = Browser.getInstance(),
        timeoutMaxInMs = 10000;

    describe('jquery.com', function () {

        it('should type some text to the search box', function (done) {
            this.timeout(timeoutMaxInMs);

            browser
                .openWindow('http://jquery.com/')
                .waitForElementExist('.searchform :input')
                .execute(function (win, next) {
                    var searchBox = win.$('.searchform :input'),
                        textToType = 'ajax';

                    searchBox.on('click', function () {
                        searchBox.val().should.equal(textToType);
                        done();
                    });
                    searchBox.val(textToType).click();
                })
                .end();
        });

//        it('should navigate to api documentation', function (done) {
//            this.timeout(5000);
//
//            browser
//                .execute(function (win, next) {
//                    win.$('#menu-top .menu-item:eq(1) a')[0].click();
//                    done();
//                })
//                .waitFor(function (win) {
//                    return win.location.hostname === 'api.jquery.com';
//                })
//                .execute(function (win, next) {
//                    done();
//                })
//                .end();
//        });


    });
});