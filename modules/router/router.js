define(['thread', 'thread-list'], 'router', function (Thread, ThreadList) {
    var controllers = [
        {mask: /thread\/(\d+)$/, constructor: Thread},
        {mask: /$/, constructor: Thread}
    ];

    function onURLChange() {
        var href = location.href;

        controllers.some(function (controllerDefinition) {
            var match  = location.href.match(controllerDefinition.mask),
                controller;

            if (match) {
                controller = new controllerDefinition.constructor(
                    match.slice(1)
                );
                return true;
            }
        });
    }

    window.addEventListener('popstate', function () {
        onURLChange();
    });
    onURLChange();

    return {
        /**
         * Changes location.href and executes controller
         *
         * @param {String} href New location.href, maybe relative path
         */
        route: function (href) {
            window.history.pushState(null, null, href);
            onURLChange();
        }
    };
});
