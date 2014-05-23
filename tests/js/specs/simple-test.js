(function () {
    describe('fake site', function () {
        it('should modified result div html', function (done) {
            browser
                .openWindow('http://localhost:9000/fake-site.html')
                .then(function (win) {
                    win.waitFor(function () {
                        return win.windowRef.$;
                    }, 3000)
                    .then(function () {
                        win
                            .waitForElementExist('#result')
                            .then(function () {
                                expect(win.select('#result').text()).to.equal('content');
                                done();
                            })

                    });
                });
        })
    });
}());