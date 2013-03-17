define(['error'], 'api', function (error) {
    var BASE = 'http://blog.gface.com/frontend-dev-test';
    function errorhandler() {
        error.show();
        hideLoader();
    }
    function showLoader() {
        document.body.style.cursor = 'progress';
    }
    function hideLoader() {
        document.body.style.cursor = 'default';
    }
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

            if (params.query && params.method !== 'POST') {
                url += '?' + params.query;
            }
            xhr.open(params.method || 'GET', url, true);
            xhr.onload = function () {
                hideLoader();
                var response;
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    return errorhandler();
                }
                if (xhr.status === 200 && response && response.status === 'ok') {
                    params.success(response);
                } else {
                    errorhandler();
                }
            };
            xhr.onerror = errorhandler;
            if (params.method === 'POST') {
                xhr.setRequestHeader(
                    "Content-type",
                    "application/x-www-form-urlencoded"
                );
                xhr.send(params.query);
            } else {
                xhr.send();
            }
            showLoader();
        }
    };
});
