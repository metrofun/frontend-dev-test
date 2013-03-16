define(['api'], 'thread-list', function (api) {
    api.get({
        resource: '/thread/read',
        success: function (response) {
            if (response && response.threads) {
                response.threads.map(function () {
                });
            }
        }
    });
});
