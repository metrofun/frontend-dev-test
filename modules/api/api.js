define('api', function () {
    var BASE = 'http://blog.gface.com/frontend-dev-test';
    return {
        /*
         * Requests REST API
         *
         * @param {Object} params
         * @param {String} [params.method] 'GET' by default
         * @param {String} params.resource
         * @param {String} [params.query]
         * @param {String} params.success Success callback
         */
        get: function (params) {
            var xhr = new XMLHttpRequest(),
                url = BASE + params.resource;

            if (params.query) {
                url += '?' + params.query;
            }
            xhr.open(params.method || 'GET', url, true);
            xhr.onload = function () {
                params.success(JSON.parse(xhr.responseText));
            };
            xhr.send();
        }
    };
});
